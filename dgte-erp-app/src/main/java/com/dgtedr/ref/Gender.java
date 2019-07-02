package com.dgtedr.ref;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Gender {

    M("Male"),
    F("Female");

    private String label;

    private Gender(String label) {
        this.label = label;
    }
    public String getLabel() {
        return label;
    }
    public String getCode() {
        return this.name();
    }

}
