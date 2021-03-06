package com.dgtedr.dto;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountDto extends BaseAccountDto {

    private ProjectDto project;
    private AccountDto parent;
    private List<ChildAccountDto> children;
    private boolean permanent;

    public boolean hasChildren() {
        return null != this.children && this.children.size() > 0;
    }
}
