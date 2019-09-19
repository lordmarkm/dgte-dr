package com.dgte.shared.app.dto;

import lombok.Data;

@Data
public class GenericResponse {

    String message;

    public static GenericResponse withMessage(String message) {
        GenericResponse g = new GenericResponse();
        g.setMessage(message);
        return g;
    }

}
