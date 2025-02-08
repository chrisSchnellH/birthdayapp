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

    // Erstellt User
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

    // Ruft paginierte Liste aller User ab
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapToUserResponse);
    }

    // Sucht User anhand seiner ID
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        return mapToUserResponse(user);
    }

    // Sucht User anhand seiner Email
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        return mapToUserResponse(user);
    }

    // Aktualisiert einen User
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        // Nur aktualisieren, wenn die Werte nicht null sind
        if (userRequest.getEmail() != null) user.setEmail(userRequest.getEmail());
        if (userRequest.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }
        if (userRequest.getRole() != null) user.setRole(userRequest.getRole());

        return mapToUserResponse(userRepository.save(user));
    }

    // Löscht einen User
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        userRepository.delete(user);
    }

    // Wandelt User Objekt in UserResponse um
    private UserResponse mapToUserResponse(User user) {
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
}
