package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.EmailLog;
import com.chrisSchnellH.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {

    // Check whether an email has already been sent today
    Optional<EmailLog> findByUserAndSentAtBetween(User user, LocalDate start, LocalDate end);
}
