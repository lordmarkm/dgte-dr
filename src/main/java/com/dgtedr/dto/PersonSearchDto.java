package com.dgtedr.dto;

import com.dgtedr.ref.Industry;
import com.dgtedr.ref.Specialization;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;

@Data
public class PersonSearchDto {

    private Industry industry;
    private Specialization specialization;
    private String term;

    public BooleanExpression toQuery() {
        return null;
    }

}
