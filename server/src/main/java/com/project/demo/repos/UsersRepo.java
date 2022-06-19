package com.project.demo.repos;

import com.project.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UsersRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
}