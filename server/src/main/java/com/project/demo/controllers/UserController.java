package com.project.demo.controllers;

import com.project.demo.entities.User;
import com.project.demo.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserServiceImpl userService;

    @PostMapping("/users/ifexists")
    public ResponseEntity<Boolean> checkIfExists(@RequestParam(name = "email") String email) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/ifexists?email=" + email).toUriString());
        return ResponseEntity.created(uri).body(userService.checkByEmail(email));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> logIn(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.loginUser(user));
    }

    @PostMapping("/users/{userId}/update-user")
    public ResponseEntity<Object> updateUser(@RequestBody User user){
        return new ResponseEntity(userService.updateUser(user), HttpStatus.OK);
    }
}