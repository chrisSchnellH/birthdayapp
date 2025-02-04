package com.chrisSchnellH.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BirthdayreminderApplication {

	public static void main(String[] args) {
		SpringApplication.run(BirthdayreminderApplication.class, args);
	}

}
