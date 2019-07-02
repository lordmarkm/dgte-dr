package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.PersonDto;
import com.dgtedr.dto.PersonSearchDto;
import com.dgtedr.service.PersonService;

@RestController
@RequestMapping("/person")
public class PersonResource {

    @Autowired
    private PersonService service;

    @GetMapping
    public ResponseEntity<Page<PersonDto>> findAll(PersonSearchDto loansSearchDto,
            @PageableDefault(size = 10)
            @SortDefault.SortDefaults({@SortDefault(sort = "createdDate", direction = Sort.Direction.DESC)}) Pageable pageable) {
        return ResponseEntity.ok(service.findAll(loansSearchDto, pageable));
    }

}
