package com.example.demo.student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;

@Service
public class StudentService {

    private final StudentRepository studentRepo;

    @Autowired
    public StudentService(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public void addStudent(Student student) {
        Example<Student> studentExample = Example.of(student,
                ExampleMatcher.matchingAny().withIgnorePaths("gender", "name").withIgnoreCase("email"));

        if (studentRepo.exists(studentExample)) {
            throw new BadRequestException("Email " + student.getEmail() + " is taken");
        }

        studentRepo.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepo.existsById(studentId)) {
            throw new StudentNotFoundException("No student has ID=" + studentId);
        }

        studentRepo.deleteById(studentId);
    }

}
