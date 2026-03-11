package com.dev.minturl.service;

import com.dev.minturl.cache.UrlCacheService;
import com.dev.minturl.dto.StatsResponse;
import com.dev.minturl.exception.InvalidUrlException;
import com.dev.minturl.exception.ShortUrlNotFoundException;
import com.dev.minturl.exception.UrlExpiredException;
import com.dev.minturl.model.UrlMapping;
import com.dev.minturl.repository.UrlRepository;
import com.dev.minturl.util.Base62Encoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UrlServiceImpl implements UrlService {

    private static final Logger log = LoggerFactory.getLogger(UrlServiceImpl.class);
    private final String CLICK_COUNTS_PREFIX = "click_counts";

    private final UrlRepository urlRepository;
    private final UrlCacheService cacheService;
    private final SequenceGeneratorService generatorService;
    private final StringRedisTemplate redisTemplate;

    public UrlServiceImpl(
            UrlRepository urlRepository,
            UrlCacheService cacheService,
            SequenceGeneratorService generatorService,
            StringRedisTemplate redisTemplate
    ) {
        this.urlRepository = urlRepository;
        this.cacheService = cacheService;
        this.generatorService = generatorService;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public String createShortCode(String originalUrl, Integer expiryDays) {

        UrlMapping existing = urlRepository
                .findByOriginalUrl(originalUrl)
                .orElse(null);

        if (existing != null) {
            return existing.getShortCode();
        }

        if (originalUrl == null || originalUrl.isBlank()) {
            throw new InvalidUrlException("URL can not be empty");
        }

        validateUrl(originalUrl);

        long id = generatorService.generateSequence("url_sequence");
        String shortCode = Base62Encoder.encode(id);

        LocalDateTime expiry = expiryDays != null
                ? LocalDateTime.now().plusDays(expiryDays)
                : LocalDateTime.now().plusHours(24);

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortCode(shortCode);
        urlMapping.setClickCount(0);
        urlMapping.setExpiryAt(expiry);

        urlRepository.save(urlMapping);

        return shortCode;
    }

    @Override
    public String getOriginalUrl(String shortCode) {

        String cachedUrl = cacheService.get(shortCode);

        if (cachedUrl != null) {

            try {
                Long count = redisTemplate
                        .opsForHash()
                        .increment(CLICK_COUNTS_PREFIX, shortCode, 1L);

                log.info("Redis click count for {} = {}", shortCode, count);
            } catch (Exception e) {
                log.warn("Redis unavailable for click counting");
            }

            log.info("Cache HIT for shortCode: {}", shortCode);
            return cachedUrl;
        }

        UrlMapping mapping = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ShortUrlNotFoundException("Short URL not found"));

        if (mapping.getExpiryAt() != null &&
                mapping.getExpiryAt().isBefore(LocalDateTime.now())) {
            throw new UrlExpiredException("URL expired");
        }

        mapping.setClickCount(mapping.getClickCount() + 1);
        urlRepository.save(mapping);

        cacheService.put(shortCode, mapping.getOriginalUrl(), mapping.getExpiryAt());

        log.info("Cache MISS for shortCode: {}", shortCode);

        return mapping.getOriginalUrl();
    }

    @Override
    public StatsResponse getStats(String shortCode) {

        UrlMapping mapping = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ShortUrlNotFoundException("Short URL not found"));

        long redisClicks = 0;

        try {
            Object val = redisTemplate.opsForHash()
                    .get(CLICK_COUNTS_PREFIX, shortCode);

            if (val != null) {
                redisClicks = Long.parseLong(val.toString());
            }

        } catch (Exception e) {
            log.warn("Redis unavailable for stats");
        }

        long totalClicks = mapping.getClickCount() + redisClicks;

        StatsResponse response = new StatsResponse();
        response.setShortCode(mapping.getShortCode());
        response.setOriginalUrl(mapping.getOriginalUrl());
        response.setClickCount(totalClicks);
        response.setCreatedAt(mapping.getCreatedAt());
        response.setExpiryAt(mapping.getExpiryAt());

        return response;
    }

    private void validateUrl(String url) {
        try {
            new java.net.URI(url).toURL();
        } catch (Exception e) {
            throw new InvalidUrlException("Invalid URL format");
        }
    }
}