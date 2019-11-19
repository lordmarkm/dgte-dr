package com.dgte.erp.rent;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.shared.dto.ApartmentDto;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RentMapper {

    Apartment toEntity(ApartmentDto game);
    ApartmentDto toDto(Apartment apartment);

}
