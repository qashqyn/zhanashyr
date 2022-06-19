package com.project.demo.entities.emailEntities;

public class RequestMessage {
    private String fondName;
    private String personInfo;
    private String email;
    private String phoneNumber;
    private String message;

    public RequestMessage(String fondName, String personInfo, String email, String phoneNumber, String message) {
        this.fondName = fondName;
        this.personInfo = personInfo;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.message = message;
    }

    public String getFondName() {
        return fondName;
    }

    public void setFondName(String fondName) {
        this.fondName = fondName;
    }

    public String getPersonInfo() {
        return personInfo;
    }

    public void setPersonInfo(String personInfo) {
        this.personInfo = personInfo;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
