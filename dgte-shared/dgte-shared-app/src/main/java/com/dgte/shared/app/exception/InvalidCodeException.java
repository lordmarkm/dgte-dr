package com.dgte.shared.app.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidCodeException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidCodeException(String message) {
        super(message);
    }

}
