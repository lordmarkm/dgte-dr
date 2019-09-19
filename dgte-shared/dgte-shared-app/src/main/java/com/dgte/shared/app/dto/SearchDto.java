package com.dgte.shared.app.dto;

import com.querydsl.core.types.dsl.BooleanExpression;

public interface SearchDto {

    String LIKE_SUFFIX = "%";

    BooleanExpression toQuery();

}
