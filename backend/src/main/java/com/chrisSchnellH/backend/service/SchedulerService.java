package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import com.chrisSchnellH.backend.repository.PersonRepository;
import com.chrisSchnellH.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final PersonRepository personRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;


    @Scheduled(cron = "0 0 6 * * ?")
    public void sendBirthdayEmails() {
        log.info("Starte Geburtstagsprüfung um 06:00 Uhr!");

        List<User> users = userRepository.findAll();
        LocalDate today = LocalDate.now();

        for (User user : users) {
            List<Person> birthdayPersons = personRepository.findByUserAndBirthDate(user, today.getMonthValue(), today.getDayOfMonth());

            if (!birthdayPersons.isEmpty()) {
                log.info("Sende Geburtstagsbenachrichtung an: {}", user.getEmail());
                emailService.sendBirthdayNotification(user, birthdayPersons);
            }
        }

        log.info("Geburtstagsprüfung abgeschlossen!");
    }
}
