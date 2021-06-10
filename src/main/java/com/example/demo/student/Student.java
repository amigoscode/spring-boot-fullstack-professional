package com.example.demo.student;

public class Student {

    private Long id;
    
    private String name;
    
    private String email;
    
    private Gender gender;
    
    public Student() {
    }

    public Student(Long id, String name, String email, Gender gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Student [id=");
        builder.append(id);
        builder.append(", name=");
        builder.append(name);
        builder.append(", email=");
        builder.append(email);
        builder.append(", gender=");
        builder.append(gender);
        builder.append("]");
        return builder.toString();
    }
    
}
