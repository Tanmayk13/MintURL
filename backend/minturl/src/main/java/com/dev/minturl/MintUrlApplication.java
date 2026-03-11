package com.dev.minturl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MintUrlApplication {

    public static void main(String[] args) {
        SpringApplication.run(MintUrlApplication.class, args);
    }

}
