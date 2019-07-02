package com.dgtedr.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "project")
public class Project extends BaseEntity {

    @Column(name = "proj_name")
    private String name;

}
