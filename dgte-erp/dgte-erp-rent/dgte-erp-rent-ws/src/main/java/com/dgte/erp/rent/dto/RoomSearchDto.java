package com.dgte.erp.rent.dto;

import static com.dgte.erp.rent.domain.QRoom.room;

import java.math.BigDecimal;

import com.dgte.shared.app.dto.SearchDto;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class RoomSearchDto extends RoomDto implements SearchDto {

    private String projectCode;
    private boolean availableOnly;
    private BigDecimal maxPriceMonthly;

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = room.deleted.isFalse().and(room.apartment.deleted.isFalse());
        if (null != this.getProjectCode()) {
            query = query.and(room.apartment.projectCode.eq(this.projectCode));
        }
        if (null != this.getApartmentCode()) {
            query = query.and(room.apartment.code.eq(this.getApartmentCode()));
        }
        if (null != this.maxPriceMonthly) {
            query = query.and(room.priceMonthly.loe(this.maxPriceMonthly));
        }
        if (availableOnly) {
            query = query.and(room.available.isTrue());
        }
        return query;
    }

}
