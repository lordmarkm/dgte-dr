package com.dgte.erp.rent.model;

import com.github.fabiomaffioletti.firebase.document.FirebaseDocument;
import com.github.fabiomaffioletti.firebase.document.FirebaseId;

import lombok.Data;

@Data
@FirebaseDocument("/apartment")
public class Apartment {

    @FirebaseId
    private String code;

    private String name;
    private String address;

}
