package com.dgtedr.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "notif_subscription")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "email", "project_id" }))
public class NotificationSubscription extends BaseEntity {

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "notify")
    @Type(type = "yes_no")
    @ColumnDefault("N")
    private boolean notify;

    @Column(name = "last_notification", nullable = false, columnDefinition = "timestamp without time zone default '2019-01-01 00:00:00'")
    private LocalDateTime lastNotification;

}
