package com.dgtedr.util;

import java.time.format.DateTimeFormatter;

public class DateUtil {

    public static final String DATE_FORMAT = "yyyy-MMM-d";
    public static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern(DATE_FORMAT);
}
