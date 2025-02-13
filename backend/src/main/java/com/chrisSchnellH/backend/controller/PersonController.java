package com.chrisSchnellH.backend.controller;

import com.chrisSchnellH.backend.dto.PersonRequest;
import com.chrisSchnellH.backend.dto.PersonResponse;
import com.chrisSchnellH.backend.security.UserDetailsImpl;
import com.chrisSchnellH.backend.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class PersonController {

    private final PersonService personService;

    // Endpunkt zum Erstellen einer Person
    @PostMapping
    public ResponseEntity<PersonResponse> createPerson(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                       @RequestBody @Valid PersonRequest personRequest) {
        return ResponseEntity.ok(personService.createPerson(userDetails.getUsername(), personRequest));
    }

    // Endpunkt zum Überarbeiten einer Person
    @PutMapping("/{id}")
    public ResponseEntity<PersonResponse> updatePerson(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                          @PathVariable Long id,
                                                          @RequestBody @Valid PersonRequest personRequest) {
        return ResponseEntity.ok(personService.updatePerson(userDetails.getUsername(), id, personRequest));
    }

    // Endpunkt zum Löschen einer Person
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                             @PathVariable Long id) {
        personService.deletePerson(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }

    // Endpunkt um alle Personen eines Users zu erhalten
    @GetMapping
    public ResponseEntity<Page<PersonResponse>> getAllPersons(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                                 @RequestParam(defaultValue = "0") int page,
                                                                 @RequestParam(defaultValue = "5") int size,
                                                                 @RequestParam(defaultValue = "birthdate") String sortBy) {
        return ResponseEntity.ok(personService.getAllPersons(userDetails.getUsername(), page, size, sortBy));
    }

    // Endpunkt um eine Person eines Users zu erhalten
    @GetMapping("/{id}")
    public ResponseEntity<PersonResponse> getPersonById(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                           @PathVariable Long id) {
        return ResponseEntity.ok(personService.getPersonById(userDetails.getUsername(), id));
    }
}


