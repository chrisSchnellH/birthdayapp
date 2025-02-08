package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // User mit Email finden
    Optional<User> findByEmail(String email);

}
