package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void shouldExistStudentsEmail() {

        String email = "fathiamir37@gmail.com";
        Student student = new Student("amir"
                , email
                , Gender.MALE);

        underTest.save(student);
        boolean result = underTest.selectExistsEmail(email);
        assertTrue(result);
    }

    @Test
    void shouldNotExistStudentsEmail() {

        String email = "fathiamir37@gmail.com";
        String email2 = "test@gmail.com";
        Student student = new Student("amir"
                , email
                , Gender.MALE);

        underTest.save(student);
        boolean result = underTest.selectExistsEmail(email2);
        assertFalse(result);
    }

}