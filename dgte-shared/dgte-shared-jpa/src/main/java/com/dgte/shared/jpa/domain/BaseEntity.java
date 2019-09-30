package com.dgte.shared.jpa.domain;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "deleted")
    @Type(type = "yes_no")
    @ColumnDefault("N")
    private boolean deleted;

    @CreatedDate
    @Column(name = "created_date", updatable = false)
    @ColumnDefault("now()")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    @ColumnDefault("now()")
    private LocalDateTime updatedDate;

    @Column(name = "code", nullable = false, updatable = false, unique = true, columnDefinition = "uuid DEFAULT uuid_generate_v4()")
    private String code;

    @PrePersist
    public void setCode() {
        this.code = UUID.randomUUID().toString();
    }

}
