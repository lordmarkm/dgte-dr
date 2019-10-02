package com.dgte.erp.games.dto;

import java.util.List;

import lombok.Data;

@Data
public class ReferencesDto {

    private List<RefDataDto> platforms;
    private List<RefDataDto> gameCopyStatuses;
    private List<AddressDto> sellDeliveryAddresses;

}
