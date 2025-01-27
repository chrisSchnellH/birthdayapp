package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.dto.PersonRequest;
import com.chrisSchnellH.backend.dto.PersonResponse;
import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import com.chrisSchnellH.backend.repository.PersonRepository;
import com.chrisSchnellH.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final UserRepository userRepository;

    public PersonResponse createPerson(String email, PersonRequest personRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Person person = new Person();
        person.setFirstname(personRequest.getFirstname());
        person.setLastname(personRequest.getLastname());
        person.setBirthdate(personRequest.getBirthdate());
        person.setNote(personRequest.getNote());
        person.setUser(user);

        Person savedPerson = personRepository.save(person);
        return mapToResponse(savedPerson);
    }

    public PersonResponse updatePerson(String email, Long id, PersonRequest personRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Person person = personRepository.findById(id)
                .filter(p -> p.getUser().equals(user))
                .orElseThrow(() -> new AccessDeniedException("Not authorized to update this person"));

            person.setFirstname(personRequest.getFirstname());
            person.setLastname(personRequest.getLastname());
            person.setBirthdate(personRequest.getBirthdate());
            person.setNote(personRequest.getNote());
            return mapToResponse(personRepository.save(person));

    }

    public void deletePerson(String userEmail, Long id) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Person person = personRepository.findById(id)
                .filter(p -> p.getUser().equals(user))
                .orElseThrow(() -> new AccessDeniedException("Not authorized to update this person"));

        personRepository.delete(person);
    }


    public Page<PersonResponse> getAllPersons(String userEmail, int page, int size, String sortBy) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return personRepository.findAllByUser(user, pageable).map(this::mapToResponse);
    }

    public PersonResponse getPersonById(String userEmail, Long personId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Person person = personRepository.findById(personId)
                .filter(p -> p.getUser().equals(user))
                .orElseThrow(() -> new AccessDeniedException("Not authorized to access this person"));

        return mapToResponse(person);
    }

    private PersonResponse mapToResponse(Person person) {
        return new PersonResponse(
                person.getId(),
                person.getFirstname(),
                person.getLastname(),
                person.getBirthdate(),
                person.getNote()
        );
    }
}
