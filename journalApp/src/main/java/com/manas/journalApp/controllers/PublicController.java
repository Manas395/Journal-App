package com.manas.journalApp.controllers;

import com.manas.journalApp.entities.User;
import com.manas.journalApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("/health-check")
    public String health() {
        return "OK";
    }

    // Renamed to /signup for better API naming conventions
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            userService.saveNewUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            // This returns a clear message if the username already exists in MongoDB
            return new ResponseEntity<>("Username already taken", HttpStatus.BAD_REQUEST);
        }
    }
}
