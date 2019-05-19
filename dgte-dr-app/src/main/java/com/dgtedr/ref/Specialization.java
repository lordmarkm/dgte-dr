package com.dgtedr.ref;

import static com.dgtedr.ref.Industry.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Specialization {
    INTERNAL_MEDICINE("Internal Medicine", MEDICAL);

    private String label;
    private Industry industry;

    private Specialization(String label, Industry industry) {
        this.label = label;
        this.industry = industry;
    }

    public String getLabel() {
        return label;
    }
    public String getCode() {
        return this.name();
    }
    public String getIndustry() {
        return this.industry.getCode();
    }
}
