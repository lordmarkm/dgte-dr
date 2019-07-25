package com.dgtedr.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class BigDecimalUtil {

    private static final String CURRENCY_FORMAT = "#,##0.00";

    public static String format(BigDecimal bigDecimal) {
        return bigDecimal != null ?  new DecimalFormat(CURRENCY_FORMAT).format(bigDecimal) : "";
    }

}
