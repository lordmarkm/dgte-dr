package com.dgte.erp.games.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgte.erp.games.domain.CopyStatus;
import com.dgte.erp.games.domain.Game;
import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.domain.GamerDeliveryAddress;
import com.dgte.erp.games.domain.GamerWallet;
import com.dgte.erp.games.domain.Order;
import com.dgte.erp.games.domain.Platform;
import com.dgte.erp.games.domain.SellDeliveryAddress;
import com.dgte.erp.games.dto.AddressDto;
import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GamerDeliveryAddressDto;
import com.dgte.erp.games.dto.GamerDto;
import com.dgte.erp.games.dto.GamerWalletDto;
import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.PublicGameDto;
import com.dgte.erp.games.dto.PublicOrderDto;
import com.dgte.erp.games.dto.RefDataDto;
import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.jpa.domain.BaseEntity;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DgteErpGamesMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseEntity anyDtoToEntity(BaseDto dto);

    Game toEntity(GameDto game);
    GameDto toDto(Game game);
    PublicGameDto toPublicDto(Game game);

    RefDataDto toDto(Platform platform);
    RefDataDto toDto(CopyStatus copyStatus);
    AddressDto toDto(SellDeliveryAddress address);

    GamerDto toDto(Gamer gamer);
    Gamer toEntity(GamerDto gamer);

    GamerDeliveryAddress toEntity(GamerDeliveryAddressDto address);

    Order toEntity(PublicOrderDto order);
    OrderDto toDto(Order order);
    PublicOrderDto toPublicDto(Order order);

    GamerWalletDto toDto(GamerWallet wallet);
}
