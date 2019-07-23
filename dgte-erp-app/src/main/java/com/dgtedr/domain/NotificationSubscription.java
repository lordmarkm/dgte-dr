package com.dgtedr.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "notif_subscription")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "project_id" }))
public class NotificationSubscription extends BaseEntity {

    @ElementCollection
    @CollectionTable(name = "notif_emails", joinColumns = @JoinColumn(name = "notif_subscription_id"),
        uniqueConstraints = @UniqueConstraint(columnNames = { "email", "notif_subscription_id" }))
    @OrderColumn(name = "email_order")
    private List<NotificationEmail> emails;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "last_notification", nullable = false, columnDefinition = "timestamp without time zone default '2019-01-01 00:00:00'")
    private LocalDateTime lastNotification;

    public boolean hasNotifiableMembers() {
        return emails.stream().filter(NotificationEmail::isEnabled).findAny().isPresent();
    }

    public String[] getEnabledEmailsAsStringArray() {
        return emails.stream()
                    .filter(NotificationEmail::isEnabled)
                    .map(NotificationEmail::getEmail).toArray(String[]::new);
    }

}
