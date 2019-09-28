package com.dgte.erp.games.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.games.domain.CopyStatus;
import com.dgte.erp.games.domain.Game;
import com.dgte.erp.games.domain.Platform;
import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.RefDataDto;
import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.jpa.domain.BaseEntity;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DgteErpGamesMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseEntity anyDtoToEntity(BaseDto dto);

    GameDto toDto(Game game);
    Game toEntity(GameDto game);

    RefDataDto toDto(Platform platform);
    RefDataDto toDto(CopyStatus copyStatus);

}
