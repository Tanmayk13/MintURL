package com.dev.minturl.exception;

public class UrlExpiredException extends RuntimeException {

    public UrlExpiredException(String message) {
        super(message);
    }
}