package com.example.spring.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.spring.utils.HeadersUtil.parseEmailFromHeader;

@CrossOrigin
@RestController
@RequestMapping("/v1/hello")
public class HelloController {

    @GetMapping("/")
    public String getHello() {
        String email = parseEmailFromHeader();
        return "Hello, " + email + "!";
    }

    @GetMapping("/verified")
    public String getHelloVerified() {
        String email = parseEmailFromHeader();
        return "Hello, you have been verified, " + email + "!";
    }
}
