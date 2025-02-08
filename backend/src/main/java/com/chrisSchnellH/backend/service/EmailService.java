package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.model.EmailLog;
import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import com.chrisSchnellH.backend.repository.EmailLogRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // Sendet Geburtstagsbenachrichtung an User, wenn Personen aus seiner Liste Geburtstag haben
    public void sendBirthdayNotification(User user, List<Person> birthdayPersons) {

        String subject = "Geburtstags-Erinnerung";
        String recipientEmail = user.getEmail();
        String message = buildBirthdayMessage(birthdayPersons);

        String errorMessage = null;
        boolean success = false;

        try {
            success = sendEmail(recipientEmail, subject, message);
        } catch (MailException | MessagingException e) {
            errorMessage = e.getClass().getSimpleName(); // Oder e.getMessage() falls nötig
            log.error("Fehler beim Senden der E-Mail an {}: {}", recipientEmail, errorMessage);
        }

        saveEmailLog(user, recipientEmail, success, errorMessage);
    }

    // Sendet die E-Mail und gibt zurück, ob das Versenden erfolgreich war
    private boolean sendEmail(String to, String subject, String text) throws MailException, MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        mailSender.send(message);
        log.info("Geburtstags-E-Mail an {} erfolgreich gesendet.", to);

        return true;
        }

    // Speichert das E-Mail-Log in der Datenbank
    private void saveEmailLog(User user, String recipientEmail, boolean success, String errorMessage) {
        EmailLog emailLog = new EmailLog();
        emailLog.setSentAt(LocalDateTime.now());
        emailLog.setUser(user);
        emailLog.setRecipientEmail(recipientEmail);
        emailLog.setStatus(success ? "SUCCESS" : "FAILED");

        if (!success && errorMessage != null) {
            emailLog.setErrorMessage(errorMessage);
            log.warn("E-Mail-Versand an {} fehlgeschlagen: {}", recipientEmail, errorMessage);
        }

        emailLogRepository.save(emailLog);
        log.info("E-Mail-Log gespeichert: User={}, Status={}", user.getEmail(), success ? "SUCCESS" : "FAILED");
    }

    // Baut die Nachricht für die Geburtstags-E-Mail zusammen
    private String buildBirthdayMessage(List<Person> birthdayPersons) {
        StringBuilder message = new StringBuilder();
        message.append("<h2>Hallo,</h2>");
        message.append("<p>Heute haben folgende Personen Geburtstag:</p><ul>");

        for (Person person : birthdayPersons) {
            message.append("<li><strong>")
                    .append(person.getFirstname()).append(" ")
                    .append(person.getLastname() != null ? person.getLastname() : "")
                    .append("</strong> (").append(person.getBirthdate()).append(" - Notiz: ")
                    .append(person.getNote()).append(")</li>");
        }

        message.append("</ul><p>Vergiss nicht, ihnen zu gratulieren! </p>");
        message.append("<p>Viele Grüße,<br>Dein Geburtstags-Reminder</p>");

        return message.toString();
    }

    // Sendet eine Test-E-Mail
    public void sendTestEmail(String to) throws MailException, MessagingException {
        String subject = "Test-E-Mail";
        String message = "<h2>Hallo,</h2><p>Dies ist eine Test-E-Mail vom Geburtstags-Reminder-Service.</p>";

        // Da es keinen `User` gibt, erstellen wir ein Dummy-Log-Eintrag
        boolean success = sendEmail(to, subject, message);
        saveEmailLog(null, to, success, success ? null : "Test-E-Mail konnte nicht gesendet werden");
    }
}
