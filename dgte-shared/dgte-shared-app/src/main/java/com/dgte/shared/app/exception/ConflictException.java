package com.dgte.shared.app.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ConflictException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ConflictException(String message) {
        super(message);
    }

}
