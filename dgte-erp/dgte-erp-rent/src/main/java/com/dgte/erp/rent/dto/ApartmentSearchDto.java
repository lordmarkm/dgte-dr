package com.dgte.erp.rent.dto;

import static com.dgte.erp.rent.domain.QApartment.apartment;

import com.dgte.shared.app.dto.SearchDto;
import com.google.common.base.Strings;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ApartmentSearchDto extends ApartmentDto implements SearchDto {

    @Override
    public BooleanExpression toQuery() {
        BooleanExpression query = apartment.deleted.isFalse();
        if (!Strings.isNullOrEmpty(this.getName())) {
            query = query.and(apartment.name.like(this.getName() + LIKE_SUFFIX));
        }
        return query;
    }

}
