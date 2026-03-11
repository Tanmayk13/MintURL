package com.dev.minturl.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StatsResponse {

    private String shortCode;
    private String originalUrl;
    private long clickCount;
    private LocalDateTime createdAt;
    private LocalDateTime expiryAt;
}