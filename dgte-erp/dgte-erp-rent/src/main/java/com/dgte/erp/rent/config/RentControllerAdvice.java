package com.dgte.erp.rent.config;

import org.springframework.web.bind.annotation.ControllerAdvice;

import com.dgte.shared.app.exception.handler.RestResponseEntityExceptionHandler;

@ControllerAdvice
public class RentControllerAdvice extends RestResponseEntityExceptionHandler {

}
