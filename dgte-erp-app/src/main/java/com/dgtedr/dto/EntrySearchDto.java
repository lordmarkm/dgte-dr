package com.dgtedr.dto;

import lombok.Data;
import static com.dgtedr.domain.QEntry.entry;

import com.google.common.base.Strings;
import com.querydsl.core.types.dsl.BooleanExpression;

@Data
public class EntrySearchDto implements SearchDto {

    private String accountCode;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = entry.deleted.isFalse();
        if (!Strings.isNullOrEmpty(accountCode)) {
            query = query.and(entry.account.code.eq(accountCode));
        }
        return query;
    }

}
