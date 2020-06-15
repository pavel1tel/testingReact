package com.example.accountservice.controller;

import com.example.accountservice.domain.User;
import com.example.accountservice.domain.enums.Role;
import com.example.accountservice.domain.enums.Status;
import com.example.accountservice.dto.UserDTO;
import com.example.accountservice.repository.UserRepository;
import com.example.accountservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/")
public class AccountController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping("/current")
    public Principal getCurrentUser(Principal principal){
        return principal;
    }

    @PreAuthorize("#oauth2.hasScope('server') and hasAuthority('ROLE_INSPECTOR')")
    @GetMapping("/{name}")
    public User getByName(@PathVariable String name){
        return userService.getByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "unable to find user"));
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    public String createUser(@Valid @RequestBody UserDTO userDTO){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = User.builder().username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .status(Status.Active)
                .role(Role.ROLE_USER)
                .build();
        try{
            userService.save(user);
        } catch (RuntimeException runtimeException){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "unable to save user");
        }
        return "user saved successfully";
    }
}
