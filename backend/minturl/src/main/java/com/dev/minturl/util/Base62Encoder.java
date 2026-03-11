package com.dev.minturl.util;

public class Base62Encoder {

    private static final String BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE_62 = 62;

    public static String encode(long number) {

        if (number == 0) return "0";

        StringBuilder shortUrl = new StringBuilder();

        while (number > 0) {
            int remainder = (int) (number % BASE_62);
            shortUrl.append(BASE62.charAt(remainder));
            number /= BASE_62;
        }

        return shortUrl.reverse().toString();
    }
}
