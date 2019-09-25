package com.dgte.shared.app.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.dgte.shared.app.dto.GenericResponse;
import com.dgte.shared.app.exception.ConflictException;
import com.dgte.shared.app.exception.InvalidCodeException;

import lombok.extern.slf4j.Slf4j;

/**
 * Extend this in each sub project
 *
 * @author mbmartinez on 19 Sep 2019
 *
 */
@Slf4j
public abstract class RestResponseEntityExceptionHandler {
 
    /**
     * This will handle @Valid validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<GenericResponse> handleBadRequest(MethodArgumentNotValidException e) {
        FieldError firstError = e.getBindingResult().getFieldError();
        GenericResponse badRequestResponse = GenericResponse.withMessage(firstError.getField() + ": " + firstError.getDefaultMessage());
        return ResponseEntity.badRequest().body(badRequestResponse);
    }

    @ExceptionHandler(value = { 
        IllegalArgumentException.class,
        IllegalStateException.class,
        ConflictException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        log.error("Conflict exception", ex);
        GenericResponse invalidCodeResponse = GenericResponse.withMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(invalidCodeResponse);
    }

    @ExceptionHandler(value = { 
        InvalidCodeException.class
    })
    protected ResponseEntity<Object> handleBadRequest(RuntimeException ex, WebRequest request) {
        log.error("Bad request", ex);
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