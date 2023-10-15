package ru.kata.spring.boot_security.demo.restControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.servises.RoleService;
import ru.kata.spring.boot_security.demo.servises.UserService;
import ru.kata.spring.boot_security.demo.validators.UserValidator;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/restAdmin")
public class RestAdminController {

    private final UserService userService;

    @Autowired
    public RestAdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<User>> restShowAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> show(@PathVariable Long id) {
       return new ResponseEntity<>(userService.show(id), HttpStatus.OK);
    }




    @PutMapping
    public ResponseEntity<User> restSave(@RequestBody User user ) {
       String username = user.getUsername();
       if(!userService.isUsernameExists(username)) {
           userService.addUser(user);
           return ResponseEntity.ok(user);
       }
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PatchMapping()
    public ResponseEntity<User> restUpdate(@RequestBody User user) {
        String username = user.getUsername();
        User existingUser = userService.findByUsername(username);
        if (existingUser == null || existingUser.getId().equals(user.getId())) {
            userService.update(user);
            return ResponseEntity.ok(user);

        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping()
    public ResponseEntity<User> restDelete(@RequestBody User user, Principal principal) {
        if(!(principal.getName().equals(user.getUsername()))){
            userService.delete(user.getId());
        }
        return ResponseEntity.ok(user);
    }
}
