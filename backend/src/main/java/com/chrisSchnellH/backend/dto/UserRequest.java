package com.chrisSchnellH.backend.dto;

import com.chrisSchnellH.backend.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    private String email;
    private String password;
    private Role role;
}
