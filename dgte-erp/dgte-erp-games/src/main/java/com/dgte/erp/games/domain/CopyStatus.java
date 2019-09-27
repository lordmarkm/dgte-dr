package com.dgte.erp.games.domain;

import javax.persistence.Entity;

import com.dgte.shared.jpa.domain.BaseReference;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "ref_game_cp_status")
public class CopyStatus extends BaseReference {

}
