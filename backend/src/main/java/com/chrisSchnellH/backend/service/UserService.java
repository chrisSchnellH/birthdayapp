package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.dto.PersonResponse;
import com.chrisSchnellH.backend.dto.UserRequest;
import com.chrisSchnellH.backend.dto.UserResponse;
import com.chrisSchnellH.backend.model.User;
import com.chrisSchnellH.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(UserRequest userRequest) {
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Benutzer existiert bereits!");
        }

        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(userRequest.getRole());

        return userRepository.save(user);
    }

    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getPersons().stream()
                                .map(person -> new PersonResponse(
                                        person.getId(),
                                        person.getFirstname(),
                                        person.getLastname(),
                                        person.getBirthdate(),
                                        person.getNote()))
                                .collect(Collectors.toList())
                ));
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole().name(),
                user.getPersons().stream()
                        .map(person -> new PersonResponse(
                                person.getId(),
                                person.getFirstname(),
                                person.getLastname(),
                                person.getBirthdate(),
                                person.getNote()))
                        .collect(Collectors.toList())
        );
    }

    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        // Nur aktualisieren, wenn die Werte nicht null sind
        if (userRequest.getEmail() != null) user.setEmail(userRequest.getEmail());
        if (userRequest.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }
        if (userRequest.getRole() != null) user.setRole(userRequest.getRole());

        User updatedUser = userRepository.save(user);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getRole().name(),
                updatedUser.getPersons().stream()
                        .map(person -> new PersonResponse(
                                person.getId(),
                                person.getFirstname(),
                                person.getLastname(),
                                person.getBirthdate(),
                                person.getNote()))
                        .collect(Collectors.toList())
        );
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        userRepository.delete(user);
    }

}
