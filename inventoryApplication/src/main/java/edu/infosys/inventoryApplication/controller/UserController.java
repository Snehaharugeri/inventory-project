package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.bean.inventoryUser;
import edu.infosys.inventoryApplication.dao.inventoryUserRepository;

@CrossOrigin(
    origins = "http://localhost:3131",
    allowCredentials = "true"
)
@RestController
@RequestMapping("/invent/users")
public class UserController {

    @Autowired
    private inventoryUserRepository repo;

    // ✅ GET ALL USERS
    @GetMapping
    public List<inventoryUser> getAllUsers() {
        return repo.findAll();
    }

    // ✅ OPTIONAL: GET USER BY ID (extra feature)
    @GetMapping("/{id}")
    public inventoryUser getUserById(@PathVariable String id) {
        return repo.findById(id).orElse(null);
    }
}