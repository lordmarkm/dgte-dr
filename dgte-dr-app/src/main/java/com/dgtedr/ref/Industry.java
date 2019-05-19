package com.dgtedr.ref;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Industry {

    MEDICAL("Medical");

    private String label;

    private Industry(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
    public String getCode() {
        return this.name();
    }
}
