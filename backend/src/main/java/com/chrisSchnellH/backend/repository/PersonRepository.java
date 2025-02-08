package com.chrisSchnellH.backend.repository;

import com.chrisSchnellH.backend.model.Person;
import com.chrisSchnellH.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    // Pagination um alle Personen eines Users zu finden
    Page<Person> findAllByUser(User user, Pageable pageable);

    // Finde Personen, die heute Geburtstag haben für den Scheduler
    @Query("SELECT p FROM Person p WHERE FUNCTION('MONTH', p.birthdate) = :month " +
            "AND FUNCTION('DAY', p.birthdate) = :day")
    List<Person> findByBirthDate(@Param("month") int month,
                                 @Param("day") int day);
}
