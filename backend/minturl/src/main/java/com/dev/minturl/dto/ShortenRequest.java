package com.dev.minturl.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ShortenRequest {
    @NotBlank(message = "URL can not be empty")
    @Pattern(
            regexp = "^(https?://).+",
            message = "URL must start with http:// or https://"
    )
    private String url;

    @Min(value = 1, message = "Expiry days must be greater than 0")
    private Integer expiryDays;
}
