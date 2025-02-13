package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.dto.EmailLogResponse;
import com.chrisSchnellH.backend.dto.PersonResponse;
import com.chrisSchnellH.backend.dto.UserResponse;
import com.chrisSchnellH.backend.model.EmailLog;
import com.chrisSchnellH.backend.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailLogService {

    private final EmailLogRepository emailLogRepository;

    // Gibt alle gespeicherten Logs zurück
    public List<EmailLogResponse> getAllEmailLogs() {
        return emailLogRepository.findAll().stream().map(emailLog ->
                new EmailLogResponse(
                        emailLog.getId(),
                        emailLog.getSentAt(),
                        emailLog.getRecipientEmail(),
                        emailLog.getStatus(),
                        emailLog.getErrorMessage(),
                        new UserResponse(
                                emailLog.getUser().getId(),
                                emailLog.getUser().getEmail(),
                                emailLog.getUser().getRole().toString(),
                                emailLog.getUser().getPersons().stream().map(person ->
                                        new PersonResponse(
                                                person.getId(),
                                                person.getFirstname(),
                                                person.getLastname(),
                                                person.getBirthdate(),
                                                person.getNote()
                                        )
                                ).collect(Collectors.toList())
                        )
                )
        ).collect(Collectors.toList());
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
