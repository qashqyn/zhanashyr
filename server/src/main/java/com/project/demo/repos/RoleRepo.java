package com.project.demo.repos;

import com.project.demo.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByRole(String role);
}
