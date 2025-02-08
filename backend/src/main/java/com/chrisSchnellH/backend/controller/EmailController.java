package com.chrisSchnellH.backend.controller;

import com.chrisSchnellH.backend.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/email")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/test")
    public ResponseEntity<String> sendTestEmail(@RequestParam String to) throws MailException, MessagingException {
        emailService.sendTestEmail(to);
        return ResponseEntity.ok("Test-E-Mail wurde an " + to + " gesendet.");
    }

}
