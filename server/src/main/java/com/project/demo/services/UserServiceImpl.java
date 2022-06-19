package com.project.demo.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.project.demo.entities.Role;
import com.project.demo.entities.User;
import com.project.demo.repos.RoleRepo;
import com.project.demo.repos.UsersRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private final UsersRepo usersRepo;

    @Autowired
    private final RoleRepo roleRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = usersRepo.findByEmail(email);
        if(user == null){
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        }else{
            log.info("User found in the database: {}", email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public Boolean checkByEmail(String email) {
        User user = usersRepo.findByEmail(email);
        if(user != null)
            return Boolean.TRUE;
        else
            return Boolean.FALSE;
    }

    @Override
    public Object saveUser(User user) {
        log.info("Saving new user {} to the database", user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = usersRepo.save(user);
        addRoleToUser(savedUser.getEmail(), "USER");

        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String accessToken = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10*60*60*1000))
                .sign(algorithm);

        Map<String, Object> resObj = new HashMap<>();
        resObj.put("user", (savedUser));
        resObj.put("token", (accessToken));

        return resObj;
    }

    @Override
    public Object loginUser(User user){
        User existingUser = usersRepo.findByEmail(user.getEmail());
        Map<String, Object> resObj = new HashMap<>();
        if(existingUser != null){
            if(!passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
                return null;
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            String accessToken = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10*60*60*1000))
                    .sign(algorithm);
            resObj.put("user", (existingUser));
            resObj.put("token", (accessToken));
            return resObj;
        }
        return null;
    }

    @Override
    public void addRoleToUser(String email, String roleName) {
        log.info("Adding role {} to user {}", roleName, email);
        User user = usersRepo.findByEmail(email);
        Role role = roleRepo.findByRole(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUserByEmail(String email) {
        log.info("Fetching user by email {}", email);
        return usersRepo.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        log.info("Fetching user by id {}", id);
        return usersRepo.findById(id).orElse(null);
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        return usersRepo.findAll();
    }

    @Override
    public Object updateUser(User user) {
        User newUser =  usersRepo.save(user);
        Map<String, Object> resObj = new HashMap<>();
        if(newUser != null){
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            String accessToken = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10*60*60*1000))
                    .sign(algorithm);
            resObj.put("user", (newUser));
            resObj.put("token", (accessToken));
            return resObj;
        }
        return null;
    }
}