package com.dev.minturl.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimiterService {

    private final StringRedisTemplate redisTemplate;
    private final String RATE_LIMIT_PREFIX = "rate_limit:";

    public RateLimiterService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean isAllowed(String ip) {
        String key = RATE_LIMIT_PREFIX + ip;

        Long count = redisTemplate.opsForValue().increment(key);

        if (count == 1) {
            redisTemplate.expire(key, Duration.ofMinutes(1));
        }

        return count <= 10;
    }
}
