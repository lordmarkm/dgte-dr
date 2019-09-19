package com.dgte.erp.rent.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.jpa.domain.BaseEntity;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DgteErpRentMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseEntity anyDtoToEntity(BaseDto dto);

    ApartmentDto toDto(Apartment apartment);
    Apartment toEntity(ApartmentDto apartment);

}
