package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    // Paginated list of the persons of a user
    Page<Person> findAllByUser(User user, Pageable pageable);

    // Find people with a birthday today
    @Query("SELECT p FROM Person p WHERE p.user = :user " +
            "AND FUNCTION('MONTH', p.birthDate) = FUNCTION('MONTH', CURRENT_DATE) " +
            "AND FUNCTION('DAY', p.birthDate) = FUNCTION('DAY', CURRENT_DATE)")
    List<Person> findByUserAndBirthDateMonthAndBirthDateDay(User user);
}
