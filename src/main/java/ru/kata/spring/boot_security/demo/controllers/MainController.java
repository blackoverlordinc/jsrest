package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/authenticated")
    public String pageForAuthenticatedUsers(){
        return "secured part of web app";
    }


    @GetMapping("/read_profile")
    public String pageForReadProfile(){
        return "read profile page";
    }

    @GetMapping("/only_for_admins")
    public String pageOnlyForAdmins(){
        return "admins page";
    }
}
