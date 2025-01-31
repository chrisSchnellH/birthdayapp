package com.chrisSchnellH.backend.service;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import com.chrisSchnellH.backend.repository.PersonRepository;
import com.chrisSchnellH.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BirthdayService {

    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public void checkAndSendBirthdayEmails() {
        List<User> users = userRepository.findAll();
        LocalDate today = LocalDate.now();

        for (User user : users) {
            List<Person> birthdayPersons = personRepository.findByUserAndBirthDate(user, today.getMonthValue(), today.getDayOfMonth());

            if(!birthdayPersons.isEmpty()) {
                emailService.sendBirthdayNotification(user, birthdayPersons);
            }
        }
    }
}
