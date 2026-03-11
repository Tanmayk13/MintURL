package com.dev.minturl.service;

import com.dev.minturl.repository.UrlRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ClickAnalyticsSyncService {

    private static final String CLICK_HASH = "click_counts";
    private static final Logger log = LoggerFactory.getLogger(ClickAnalyticsSyncService.class);

    private final StringRedisTemplate redisTemplate;
    private final UrlRepository urlRepository;

    public ClickAnalyticsSyncService(StringRedisTemplate redisTemplate, UrlRepository urlRepository) {
        this.redisTemplate = redisTemplate;
        this.urlRepository = urlRepository;
    }

    @Scheduled(fixedDelayString = "${analytics.sync.interval}")
    public void syncClicksToMongo() {

        log.info("Scheduler triggered");

        try {

            Map<Object, Object> clickMap =
                    redisTemplate.opsForHash().entries(CLICK_HASH);

            if (clickMap == null || clickMap.isEmpty()) {
                log.debug("No click analytics to sync");
                return;
            }

            log.info("Syncing {} analytics entries", clickMap.size());

            for (Map.Entry<Object, Object> entry : clickMap.entrySet()) {

                String shortCode = entry.getKey().toString();
                long count = Long.parseLong(entry.getValue().toString());

                urlRepository.findByShortCode(shortCode).ifPresent(mapping -> {
                    mapping.setClickCount(mapping.getClickCount() + count);
                    urlRepository.save(mapping);
                });

                redisTemplate.opsForHash().delete(CLICK_HASH, shortCode);
            }

        } catch (Exception e) {
            log.warn("Redis unavailable, skipping analytics sync");
        }
    }
}