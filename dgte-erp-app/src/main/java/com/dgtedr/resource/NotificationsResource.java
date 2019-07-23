package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.NotificationSubscriptionDto;
import com.dgtedr.service.NotificationSubscriptionService;

@RestController
@RequestMapping("/notifications")
public class NotificationsResource {

    @Autowired
    private NotificationSubscriptionService service;

    @GetMapping("/find-by-project-code")
    public ResponseEntity<NotificationSubscriptionDto> findByProjectCode(@RequestParam String projectCode) {
        return service.findDtoByProjectCode(projectCode)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
