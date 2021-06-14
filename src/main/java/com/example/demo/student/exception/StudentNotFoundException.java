package com.example.demo.student.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class StudentNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -9030433550247888398L;

    public StudentNotFoundException(String msg) {
        super(msg);
    }
    
}
