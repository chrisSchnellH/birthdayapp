package com.chrisSchnellH.backend.controller;

import com.chrisSchnellH.backend.dto.EmailLogResponse;
import com.chrisSchnellH.backend.model.EmailLog;
import com.chrisSchnellH.backend.service.EmailLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/email-logs")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class EmailLogController {

    private final EmailLogService emailLogService;

    // Endpunkt für alle Logs
    @GetMapping
    public List<EmailLogResponse> getAllEmailLogs() {
        return emailLogService.getAllEmailLogs();
    }

    // Endpunkt für einzelnen Log
    @GetMapping("/{id}")
    public EmailLog getEmailLogById(@PathVariable Long id) {
        return emailLogService.getEmailLogById(id);
    }

    // Endpunkt für alle Logs eines bestimmten Users
    @GetMapping("/user/{userId}")
    public List<EmailLog> getEmailLogsByUserId(@PathVariable Long userId) {
        return emailLogService.getEmailLogsByUserId(userId);
    }

    // Endpunkt zum löschen eines Logs
    @DeleteMapping("/{id}")
    public void deleteEmailLog(@PathVariable Long id) {
        emailLogService.deleteEmailLog(id);
    }

}
