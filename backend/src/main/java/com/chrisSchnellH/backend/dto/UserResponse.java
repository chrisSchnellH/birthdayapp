package com.chrisSchnellH.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String email;
    private String role;
    private List<PersonResponse> persons;
}
