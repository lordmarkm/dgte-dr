package com.dgte.erp.games.dto;

import static com.dgte.erp.games.domain.QOrder.order;

import org.apache.logging.log4j.util.Strings;

import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;

@Data
public class OrderSearchDto {

    private String gamerEmail;

    public BooleanExpression toQuery() {
        BooleanExpression query = order.deleted.isFalse();

        if (Strings.isEmpty(gamerEmail)) {
            query = query.and(order.gamer.email.eq(gamerEmail));
        }

        return query;
    }

}
