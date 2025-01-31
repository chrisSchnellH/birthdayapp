package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendBirthdayNotification(User user, List<Person> birthdayPersons) {
        if (birthdayPersons.isEmpty()) {
            return; // Falls keine Geburtstage vorliegen, keine E-Mail senden
        }

        String subject = "Geburtstags-Erinnerung";
        String recipientEmail = user.getEmail();
        String message = buildBirthdayMessage(user.getEmail(), birthdayPersons);

        sendEmail(recipientEmail, subject, message);
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
            log.info("Geburtstags-E-Mail an {} erfolgreich gesendet.", to);
        } catch (MessagingException e) {
            log.error("Fehler beim Senden der E-Mail an {}: {}", to, e.getMessage());
        }
    }

    private String buildBirthdayMessage(String userEmail, List<Person> birthdayPersons) {
        StringBuilder message = new StringBuilder();
        message.append("<h2>Hallo,</h2>");
        message.append("<p>Heute haben folgende Personen Geburtstag:</p>");
        message.append("<ul>");

        for (Person person : birthdayPersons) {
            message.append("<li><strong>").append(person.getFirstname()).append(" ")
                    .append(person.getLastname() != null ? person.getLastname() : "").append("</strong> (")
                    .append(person.getBirthdate()).append(")</li>");
        }

        message.append("</ul>");
        message.append("<p>Vergiss nicht, ihnen zu gratulieren! 🎉</p>");
        message.append("<p>Viele Grüße,<br>Dein Geburtstags-Reminder</p>");

        return message.toString();
    }
}
