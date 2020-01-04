package com.dgte.erp.rent.shared.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomDto extends BaseDto {

    private String projectId;
    private String apartmentId;
    private String name;

}
