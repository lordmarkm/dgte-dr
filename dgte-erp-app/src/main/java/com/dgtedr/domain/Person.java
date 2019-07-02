package com.dgtedr.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.dgtedr.ref.CivilStatus;
import com.dgtedr.ref.Gender;
import com.dgtedr.ref.Industry;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "person")
@EqualsAndHashCode(callSuper = true)
public class Person extends BaseEntity {

    @Column(name = "industry", nullable = false)
    @Enumerated(EnumType.STRING)
    private Industry industry;

    @Column(name = "f_name", nullable = false)
    private String firstName;

    @Column(name = "m_name")
    private String middleName;

    @Column(name = "l_name", nullable = false)
    private String lastName;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    @Column(name = "pob")
    private String placeOfBirth;

    @Column(name = "email", nullable = false)
    private String emailAdd;

    @Column(name = "mobile", nullable = false)
    private String mobileNumber;

    @Column(name = "landline")
    private String landLineNumber;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "civ_status")
    @Enumerated(EnumType.STRING)
    private CivilStatus civilStatus;

}
