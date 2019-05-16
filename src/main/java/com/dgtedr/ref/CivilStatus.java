package com.dgtedr.ref;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CivilStatus {

    CO("Cohabiting/Common Law"),
    DI("Divorced"),
    MA("Married"),
    SE("Separated"),
    SI("Single"),
    WI("Widowed");

    private String label;

    private CivilStatus(String label) {
        this.label = label;
    }
    public String getLabel() {
        return label;
    }
    public String getCode() {
        return this.name();
    }

}
