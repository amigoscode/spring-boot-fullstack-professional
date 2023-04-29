package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import net.bytebuddy.matcher.ElementMatchers;
import org.assertj.core.api.Assertions;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;
    private StudentService underTest;
    private Student student;

    @BeforeEach
    void setUp() {
        underTest = new StudentService(studentRepository);
        student = new Student("amir", "fathiamir37@gmail.com", Gender.MALE);
    }


    @Test
    void canGetAllStudents() {
        // Arrange
        List<Student> studentList = Arrays.asList(
                new Student("amir", "fathiamir37@gmail.com", Gender.MALE),
                new Student("sara", "saraamir37@gmail.com", Gender.FEMALE));
        Mockito.when(studentRepository.findAll()).thenReturn(studentList);

        // Act
        List<Student> allStudents = underTest.getAllStudents();

        // Assert
        Assertions.assertThat(studentList.size()).isEqualTo(allStudents.size());

        // Verify
        Mockito.verify(studentRepository).findAll();
    }

    @Test
    void shouldAddStudent() {

        underTest.addStudent(student);

        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);

        Mockito.verify(studentRepository).save(studentArgumentCaptor.capture());

        Student value = studentArgumentCaptor.getValue();

        Assertions.assertThat(value).isEqualTo(student);


    }

    @Test
    void shouldGetExceptionWhenAddingStudent() {

        Mockito.when(studentRepository.selectExistsEmail(ArgumentMatchers.any())).thenReturn(true);

        Assertions.assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOfAny(BadRequestException.class);
        Mockito.verify(studentRepository, Mockito.never()).save(ArgumentMatchers.any());
    }

    @Test
    void shouldBeAbleToDeleteStudent() {

        Mockito.when(studentRepository.existsById(ArgumentMatchers.any())).thenReturn(false);
//        underTest.deleteStudent(123L);
        Mockito.verify(studentRepository).deleteById(123L);
    }

    @Test
    void shouldGetExceptionWhenDeleteStudent() {

        Mockito.
                when(studentRepository
                        .existsById(ArgumentMatchers.any()))
                .thenReturn(false);

        Assertions
                .assertThatThrownBy(() -> underTest.deleteStudent(121L))
                .isInstanceOf(StudentNotFoundException.class);

        Mockito
                .verify(studentRepository, Mockito.never()).deleteById(ArgumentMatchers.any());
    }
}