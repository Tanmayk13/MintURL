package com.dev.minturl.controller;

import com.dev.minturl.dto.ShortenRequest;
import com.dev.minturl.dto.ShortenResponse;
import com.dev.minturl.dto.StatsResponse;
import com.dev.minturl.exception.RateLimitExceededException;
import com.dev.minturl.service.RateLimiterService;
import com.dev.minturl.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class UrlController {
    private final UrlService urlService;
    private final RateLimiterService rateLimiter;

    public UrlController(UrlService urlService, RateLimiterService rateLimiter) {
        this.urlService = urlService;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping("/shorten")
    public ResponseEntity<ShortenResponse> createShortUrl(@Valid @RequestBody ShortenRequest request, HttpServletRequest httpServletRequest) {

        String ip = httpServletRequest.getRemoteAddr();

        if (!rateLimiter.isAllowed(ip)) {
            throw new RateLimitExceededException("Rate limit exceeded");
        }

        String shortcode = urlService.createShortCode(request.getUrl(), request.getExpiryDays());

        String shortUrl = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/")
                .path(shortcode)
                .toUriString();

        ShortenResponse response = new ShortenResponse();
        response.setShortUrl(shortUrl);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats/{shortCode}")
    public ResponseEntity<StatsResponse> getStats(@PathVariable String shortCode) {
        StatsResponse response = urlService.getStats(shortCode);

        return ResponseEntity.ok(response);
    }
}
