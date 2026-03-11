package com.dev.minturl.service;

import com.dev.minturl.dto.StatsResponse;

public interface UrlService {
    String createShortCode(String originalUrl, Integer expiryDays);

    String getOriginalUrl(String shortUrl);

    StatsResponse getStats(String shortCode);
}
