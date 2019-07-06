package com.dgtedr.dto;

import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;
import static com.dgtedr.domain.QTransaction.transaction;

import com.google.common.base.Strings;

@Data
public class TransactionSearchDto implements SearchDto {

    private String projectCode;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = transaction.deleted.isFalse();
        if (!Strings.isNullOrEmpty(projectCode)) {
            query = query.and(transaction.project.code.eq(projectCode));
        }
        return query;
    }

}
