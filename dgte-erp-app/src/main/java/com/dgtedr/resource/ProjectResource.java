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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;
import com.dgtedr.service.ProjectService;

@RestController
@RequestMapping("/project")
public class ProjectResource {

    @Autowired
    private ProjectService projects;

    @GetMapping
    public ResponseEntity<Page<ProjectDto>> findAll(@RequestParam ProjectSearchDto searchDto, Pageable pageable) {
        return ResponseEntity.ok(projects.findAll(searchDto, pageable));
    }

}
