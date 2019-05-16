package com.dgtedr.dto;

import java.time.LocalDate;

import com.dgtedr.ref.CivilStatus;
import com.dgtedr.ref.Gender;
import com.dgtedr.ref.Industry;
import com.dgtedr.ref.Specialization;

import lombok.Data;

@Data
public class ReferenceDto {

    private LocalDate asOfDate = LocalDate.now();
    private Gender[] gender = Gender.values();
    private CivilStatus[] civilStatus = CivilStatus.values();
    private Industry[] industry = Industry.values();
    private Specialization[] specialization = Specialization.values();

    public static ReferenceDto references() {
        ReferenceDto rdto = new ReferenceDto();
        return rdto;
    }

}
