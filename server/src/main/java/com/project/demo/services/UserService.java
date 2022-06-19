package com.project.demo.services;

import com.project.demo.entities.Role;
import com.project.demo.entities.User;

import java.util.List;

public interface UserService {
    Object saveUser(User user);
    void addRoleToUser(String email, String roleName);
    User getUserByEmail(String email);
    List<User> getUsers();
    Boolean checkByEmail(String email);
    User getUserById(Long id);
    Object loginUser(User user);
    Object updateUser(User user);
}