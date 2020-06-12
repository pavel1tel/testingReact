package com.example.demo.service.service;

import com.example.demo.domain.User;
import com.example.demo.exceptions.UnknownUserException;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User getByEmail(String email) throws UnknownUserException {
        return userRepository.findByEmail(email).orElseThrow(UnknownUserException::new);
    }
}
