package com.dgtedr.dto;

import java.time.LocalDate;

import com.dgtedr.ref.CivilStatus;
import com.dgtedr.ref.Gender;
import com.dgtedr.ref.Industry;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class PersonDto extends AuditableDto {

    private Industry industry;
    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String placeOfBirth;
    private String emailAdd;
    private String mobileNumber;
    private String landLineNumber;
    private String landLineAreaCode;
    private Gender gender;
    private CivilStatus civilStatus;

    public String getFullName() {
        return lastName + ", " + firstName + " " + middleName;
    }
}
