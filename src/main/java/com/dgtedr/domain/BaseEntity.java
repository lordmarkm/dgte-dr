package com.dgtedr.domain;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Type;

import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "deleted")
    @Type(type = "yes_no")
    private boolean deleted;

}
