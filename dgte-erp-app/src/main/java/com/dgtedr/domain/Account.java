package com.dgtedr.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.dgtedr.ref.AccountType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "account")
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"project_id", "acct_code"}),
})
public class Account extends BaseEntity {

    @Column(name = "acct_name", nullable = false)
    private String name;

    @Column(name = "acct_code", nullable = false)
    private String code;

    @Column(name = "acct_desc")
    private String description;

    @Column(name = "acct_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountType type;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(cascade = {})
    @JoinColumn(name = "parent_id")
    private Account parent;

    @OneToMany(mappedBy = "parent", cascade = {})
    private List<Account> children;

}