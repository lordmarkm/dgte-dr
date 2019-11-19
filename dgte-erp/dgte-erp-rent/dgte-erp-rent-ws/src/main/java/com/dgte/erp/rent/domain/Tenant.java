package com.dgte.erp.rent.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Embeddable
public class Tenant {

    @Column(name = "tnt_name")
    private String name;

}
