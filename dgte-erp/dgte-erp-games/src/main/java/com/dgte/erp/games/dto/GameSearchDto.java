package com.dgte.erp.games.dto;

import com.dgte.shared.app.dto.SearchDto;
import com.google.common.base.Strings;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;

import static com.dgte.erp.games.domain.QGame.game;

@Data
public class GameSearchDto implements SearchDto {

    private String name;
    private String platformCode;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = game.deleted.isFalse();
        if (!Strings.isNullOrEmpty(this.platformCode)) {
            query = query.and(game.platform.code.eq(this.platformCode));
        }
        if (!Strings.isNullOrEmpty(this.getName())) {
            query = query.and(game.name.like(this.getName() + LIKE_SUFFIX));
        }
        return query;
    }

}
