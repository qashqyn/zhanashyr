package com.project.demo.entities.emailEntities;

public class QuestionMessage {
    private String fullname;
    private String email;
    private String phoneNumber;
    private String questionType;
    private String message;

    public QuestionMessage(String fullname, String email, String phoneNumber, String questionType, String message) {
        this.fullname = fullname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.questionType = questionType;
        this.message = message;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
