package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/")
public class Testttt {

    @GetMapping
    public String getExample(){
        return "Hello world";
    }

    @GetMapping("greeting")
    public String getExample(@RequestParam(name = "name" ,required = false) String text){
        text = Optional.ofNullable(text).orElse("Anon");
        return "Hello " + text;
    }
}
