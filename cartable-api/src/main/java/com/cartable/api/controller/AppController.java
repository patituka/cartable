package com.cartable.api.controller;

import com.cartable.api.model.Resource;
import com.cartable.api.model.User;
import com.cartable.api.service.DataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppController {

    private final DataService dataService;

    public AppController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return dataService.getAllUsers();
    }

    @GetMapping("/resources")
    public List<Resource> getResources() {
        return dataService.getAllResources();
    }
}
