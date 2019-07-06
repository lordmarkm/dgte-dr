package com.dgtedr.dto;

import lombok.Data;
import static com.dgtedr.domain.QProject.project;

import com.google.common.base.Strings;
import com.querydsl.core.types.dsl.BooleanExpression;

@Data
public class ProjectSearchDto implements SearchDto {

    private String name;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = project.deleted.isFalse();
        if (Strings.isNullOrEmpty(name)) {
            query = query.and(project.name.like(name + LIKE_SUFFIX));
        }
        return query;
    }

}
