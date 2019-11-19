package com.dgte.erp.rent.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "apt")
public class Apartment extends BaseEntity {

    @Column(name = "proj_code", nullable = false, unique = true)
    private String projectCode;

    @Column(name = "apt_name", nullable = false)
    private String name;

    @Column(name = "addr", nullable = false)
    @Type(type = "text")
    private String address;

}
