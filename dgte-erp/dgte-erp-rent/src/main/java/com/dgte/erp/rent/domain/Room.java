package com.dgte.erp.rent.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "room")
public class Room extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "apt_id", nullable = false)
    private Apartment apartment;

    @Column(name = "rm_name", nullable = false)
    private String name;

}
