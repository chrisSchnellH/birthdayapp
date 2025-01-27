package com.chrisSchnellH.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonRequest {
    private String firstname;
    private String lastname;
    private LocalDate birthdate;
    private String note;
}
