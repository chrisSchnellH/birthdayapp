package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {

    // Liste um Emaillogs eines Users zu finden
    List<EmailLog> findByUserId(Long userId);
}
