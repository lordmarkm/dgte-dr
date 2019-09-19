package com.dgte.shared.app.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.dgte.shared.app.dto.GenericResponse;
import com.dgte.shared.app.exception.InvalidCodeException;

import lombok.extern.slf4j.Slf4j;

/**
 * Extend this in each sub project
 *
 * @author mbmartinez on 19 Sep 2019
 *
 */
@Slf4j
public abstract class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
 
    @ExceptionHandler(value = { 
        IllegalArgumentException.class,
        IllegalStateException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        GenericResponse invalidCodeResponse = GenericResponse.withMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(invalidCodeResponse);
    }

    @ExceptionHandler(InvalidCodeException.class)
    protected ResponseEntity<Object> handleInvalidCode(RuntimeException ex, WebRequest request) {
        GenericResponse invalidCodeResponse = GenericResponse.withMessage(ex.getMessage());
        return ResponseEntity.badRequest().body(invalidCodeResponse);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleGenericException(Exception e) {
        log.error("unexpected exception", e);
        GenericResponse invalidCodeResponse = GenericResponse.withMessage("An unexpected exception occurred. That's all we can tell you.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(invalidCodeResponse);
    }

}