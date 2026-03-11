package com.dev.minturl.cache;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class UrlCacheService {

    private static final long DEFAULT_CACHE_TTL = 24 * 60 * 60;
    private static final String CACHE_URL_PREFIX = "url:";
    private final StringRedisTemplate redisTemplate;

    public UrlCacheService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String get(String shortCode) {
        try {
            return redisTemplate.opsForValue().get(CACHE_URL_PREFIX + shortCode);
        } catch (Exception e) {
            return null;
        }
    }

    public void put(String shortCode, String originalUrl, LocalDateTime expiryAt) {
        try {
            long ttl = DEFAULT_CACHE_TTL;

            if (expiryAt != null) {
                ttl = Duration.between(
                        LocalDateTime.now(),
                        expiryAt
                ).getSeconds();

                if (ttl <= 0) {
                    return;
                }
            }

            redisTemplate.opsForValue()
                    .set(CACHE_URL_PREFIX + shortCode, originalUrl, ttl, TimeUnit.SECONDS);

        } catch (Exception e) {
            // Redis unavailable → skip caching
        }
    }
}