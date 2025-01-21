package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Search users by e-mail
    Optional<User> findByEmail(String email);

    // Check if e-mail exists
    boolean existsByEmail(String email);
}
