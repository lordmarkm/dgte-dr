package com.dgte.erp.games.domain;

import javax.persistence.Entity;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "gamer")
public class Gamer extends BaseEntity {

}
