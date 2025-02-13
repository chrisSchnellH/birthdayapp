package com.chrisSchnellH.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmailLogResponse {
    private Long id;
    private LocalDateTime sentAt;
    private String recipientEmail;
    private String status;
    private String errorMessage;
    private UserResponse user;
}
