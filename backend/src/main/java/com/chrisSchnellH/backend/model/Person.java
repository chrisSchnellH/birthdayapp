package com.chrisSchnellH.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "persons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String firstname;

    private String lastName; // optional

    @NotNull
    @Column(nullable = false)
    private LocalDate birthDate;

    private String note; // optional

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
