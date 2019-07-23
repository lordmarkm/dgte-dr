package com.dgtedr.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import lombok.Data;

@Data
@Embeddable
public class NotificationEmail {

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "enabled", nullable = false)
    @Type(type = "yes_no")
    @ColumnDefault("Y")
    private boolean enabled;

}
