package com.example.accountservice.service;

import com.example.accountservice.domain.User;
import com.example.accountservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getByName(String name){
        return userRepository.findByUsername(name);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public void save(User user){
        userRepository.save(user);
    }
}
