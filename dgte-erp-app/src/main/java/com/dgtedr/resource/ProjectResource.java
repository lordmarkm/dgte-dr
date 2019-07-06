package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;
import com.dgtedr.service.ProjectService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/project")
public class ProjectResource {

    @Autowired
    private ProjectService projects;

    @GetMapping
    public ResponseEntity<Page<ProjectDto>> search(ProjectSearchDto searchDto, Pageable pageable) {
        log.debug("Project search request. search={}", searchDto);
        return ResponseEntity.ok(projects.findAll(searchDto, pageable));
    }

    @GetMapping("/find-by-code")
    public ResponseEntity<ProjectDto> findByCode(@RequestParam String code) {
        return projects.findDtoByCode(code)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping
    public ResponseEntity<ProjectDto> save(@RequestBody ProjectDto project) {
        log.debug("Project save request. project={}", project);
        return ResponseEntity.ok(projects.save(project));
    }

}
