package com.dgte.erp.rent;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.model.BaseCosmosEntity;
import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.dgte.erp.rent.shared.dto.BaseDto;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RentMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseCosmosEntity anyDtoToEntity(BaseDto dto);

    ApartmentDto toDto(Apartment apartment);
    Apartment toEntity(ApartmentDto apartment);
}
