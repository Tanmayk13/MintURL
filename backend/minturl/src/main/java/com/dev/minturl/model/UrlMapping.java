package com.dev.minturl.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "urls")
@Data
public class UrlMapping {
    @Id
    private String id;

    @Indexed(name = "short_code_index", unique = true)
    private String shortCode;

    @Indexed
    private String originalUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Indexed(expireAfter = "0s")
    private LocalDateTime expiryAt;

    private long clickCount = 0;
}
