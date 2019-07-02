package com.dgtedr.service;

import com.dgtedr.domain.Person;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface PersonService extends BaseJpaRepository<Person, Long>, PersonServiceCustom {

}
