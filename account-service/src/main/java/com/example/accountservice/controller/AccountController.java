package com.example.accountservice.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/")
public class AccountController {

    @PreAuthorize("#oauth2.hasScope('server')")
    @GetMapping
    public String helloWorld(){
        return "Hello world Hello";
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @PostMapping
    public String helloWorldPost(){
        return "Hello world Hello";
    }
}
