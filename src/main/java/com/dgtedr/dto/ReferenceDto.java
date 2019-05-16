package com.dgtedr.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReferenceDto {

    private LocalDate asOfDate = LocalDate.now();

    public static ReferenceDto references() {
        ReferenceDto rdto = new ReferenceDto();
        return rdto;
    }

}
