package com.dgtedr.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.dgtedr.ref.AccountType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Account extends BaseEntity {

    @Column(name = "acct_name", nullable = false)
    private String name;

    @Column(name = "acct_code", nullable = false)
    private String code;

    @Column(name = "acct_desc")
    private String description;

    @Column(name = "acct_type", nullable = false)
    private AccountType type;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Account parent;

    @OneToMany
    private List<Account> children;

}
