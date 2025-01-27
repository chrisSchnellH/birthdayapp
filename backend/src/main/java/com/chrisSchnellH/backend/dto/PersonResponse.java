package com.chrisSchnellH.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonResponse {
    private Long id;
    private String firstname;
    private String lastname;
    private LocalDate birthdate;
    private String note;
}
