package com.dgte.erp.games.dto;

import com.dgte.shared.app.dto.SearchDto;
import com.google.common.base.Strings;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;

import static com.dgte.erp.games.domain.QGame.game;

@Data
public class GameSearchDto implements SearchDto {

    private String name;
    private String platformRefCode;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = game.deleted.isFalse();
        if (!Strings.isNullOrEmpty(this.platformRefCode)) {
            query = query.and(game.platform.refCode.eq(this.platformRefCode));
        }
        if (!Strings.isNullOrEmpty(this.getName())) {
            query = query.and(game.name.like(this.getName() + LIKE_SUFFIX));
        }
        return query;
    }

}
