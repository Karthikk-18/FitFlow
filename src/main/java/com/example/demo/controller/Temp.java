package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class Temp {
    @GetMapping("/env")
    public String testEnv(){
        return System.getenv("SUPABASE_DB_URL") != null ? "Env loaded" : "not loaded";
    }
}
