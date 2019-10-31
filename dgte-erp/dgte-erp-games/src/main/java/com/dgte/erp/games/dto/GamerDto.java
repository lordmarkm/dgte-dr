package com.dgte.erp.games.dto;

import java.util.List;

import com.dgte.shared.app.dto.BaseDto;
import com.google.common.collect.Lists;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class GamerDto extends BaseDto {

    private String displayName;
    private String email;
    private List<GamerDeliveryAddressDto> addresses;

    public List<GamerDeliveryAddressDto> getAddressesPrimaryFirst() {
        if (null == this.addresses) {
            return Lists.newArrayList();
        } else {
            addresses.sort((addr1, addr2) -> {
                return addr1.isPrimary() ? -1 : 1;
            });
            return addresses;
        }
    }
}
