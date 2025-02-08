package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.model.EmailLog;
import com.chrisSchnellH.backend.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailLogService {

    private final EmailLogRepository emailLogRepository;

    // Gibt alle gespeicherten Logs zurück
    public List<EmailLog> getAllEmailLogs() {
        return emailLogRepository.findAll();
    }

    // Gibt einen einzelnen Log anhand ID zurück
    public EmailLog getEmailLogById(Long id) {
        return emailLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("E-Mail-Log nicht gefunden!"));
    }

    // Gibt alle Emaillogs für einen User zurück
    public List<EmailLog> getEmailLogsByUserId(Long userId) {
        return emailLogRepository.findByUserId(userId);
    }

    // Löscht Emaillogs
    public void deleteEmailLog(Long id) {
        emailLogRepository.deleteById(id);
    }
}
