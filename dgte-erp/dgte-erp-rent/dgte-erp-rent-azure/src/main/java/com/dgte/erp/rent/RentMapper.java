package com.dgte.erp.rent;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.model.BaseCosmosEntity;
import com.dgte.erp.rent.model.Lease;
import com.dgte.erp.rent.model.Project;
import com.dgte.erp.rent.model.Room;
import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.dgte.erp.rent.shared.dto.BaseDto;
import com.dgte.erp.rent.shared.dto.LeaseDto;
import com.dgte.erp.rent.shared.dto.ProjectDto;
import com.dgte.erp.rent.shared.dto.RoomDto;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RentMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseCosmosEntity anyDtoToEntity(BaseDto dto);

    ProjectDto toDto(Project project);
    Project toEntity(ProjectDto project);

    ApartmentDto toDto(Apartment apartment);
    Apartment toEntity(ApartmentDto apartment);

    RoomDto toDto(Room entity);
    Room toEntity(RoomDto dto);

    LeaseDto toDto(Lease entity);
    Lease toEntity(LeaseDto dto);
}
