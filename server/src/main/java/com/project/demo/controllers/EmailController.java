package com.project.demo.controllers;

import com.project.demo.entities.emailEntities.QuestionMessage;
import com.project.demo.entities.emailEntities.RequestMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin
public class EmailController {

    @Autowired
    public JavaMailSender emailSender;

    @PostMapping(value="/send-question-email")
    public ResponseEntity<String> sendQuestionEmail(@RequestBody QuestionMessage questionMessage) {

        // Create a Question MailMessage.
        SimpleMailMessage newMessage = new SimpleMailMessage();

        newMessage.setFrom(questionMessage.getEmail());
        newMessage.setTo("zhanashyrcompany@gmail.com");
        newMessage.setSubject(questionMessage.getQuestionType() + " - " + questionMessage.getFullname());
        newMessage.setText(questionMessage.getMessage() + "\n\n" + questionMessage.getFullname() + "\n" + questionMessage.getEmail() + "\n" + questionMessage.getPhoneNumber());

        // Send Message!
        emailSender.send(newMessage);
        return new ResponseEntity("Question Email Sent!", HttpStatus.OK);
    }

    @PostMapping(value="/send-request-email")
    public ResponseEntity<String> sendRequestEmail(@RequestBody RequestMessage requestMessage) {

        // Create a Request MailMessage.
        SimpleMailMessage newMessage = new SimpleMailMessage();

        newMessage.setFrom(requestMessage.getEmail());
        newMessage.setTo("zhanashyrcompany@gmail.com");
        newMessage.setSubject("Өтініш: " + requestMessage.getPersonInfo() + ", " + requestMessage.getFondName());
        newMessage.setText(requestMessage.getMessage() + "\n\n" + requestMessage.getPersonInfo() + "\n" + requestMessage.getFondName() + "\n" + requestMessage.getPhoneNumber() + "\n" + requestMessage.getEmail());

        // Send Message!
        emailSender.send(newMessage);
        return new ResponseEntity("Request Email Sent!", HttpStatus.OK);
    }
}
