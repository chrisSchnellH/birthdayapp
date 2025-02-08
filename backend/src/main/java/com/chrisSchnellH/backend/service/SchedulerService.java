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
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final PersonRepository personRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    // Task der täglich um 06:00 ausgeführt wird, um Geburtstagsmail zu versenden
    @Scheduled(cron = "0 0 6 * * ?")
    public void sendBirthdayEmails() {
        log.info("Starte Geburtstagsprüfung um 06:00 Uhr!");

        LocalDate today = LocalDate.now();

        // Alle Personen abrufen, die heute Geburtstag haben
        List<Person> birthdayPersons = personRepository.findByBirthDate(today.getMonthValue(), today.getDayOfMonth());

        // Gruppieren der Geburtstagskinder nach dem zugehörigen Benutzer
        Map<User, List<Person>> personsByUser = birthdayPersons.stream()
                .collect(Collectors.groupingBy(Person::getUser));

        // Für jeden User, der Geburtstagspersonen hat, eine Benachrichtigung senden
        personsByUser.forEach((user, persons) -> {
            log.info("Sende Geburtstagsbenachrichtigung an: {}", user.getEmail());
            emailService.sendBirthdayNotification(user, persons);
        });

        log.info("Geburtstagsprüfung abgeschlossen!");
    }
}
