package com.dgtedr.dto;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChildAccountDto extends BaseAccountDto {

    private List<ChildAccountDto> children;

    public boolean hasChildren() {
        return null != this.children && this.children.size() > 0;
    }
}
