package com.Sant.SpringNewSecurity.controller;

import com.Sant.SpringNewSecurity.dto.RepResp;
import com.Sant.SpringNewSecurity.entity.OurUsers;
import com.Sant.SpringNewSecurity.service.UserManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    private UserManagerService userManagerService;

    @PostMapping("/auth/register")
    public ResponseEntity<RepResp> regeister(@RequestBody RepResp reg){
        return ResponseEntity.ok(userManagerService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RepResp> login(@RequestBody RepResp req){
        return ResponseEntity.ok(userManagerService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RepResp> refreshToken(@RequestBody RepResp req){
        return ResponseEntity.ok(userManagerService.refresToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<RepResp> getAllUsers(){
        return ResponseEntity.ok(userManagerService.getAllUsers());

    }
    @GetMapping("/user/get-all-users")
    public ResponseEntity<RepResp> getUsers(){
        return ResponseEntity.ok(userManagerService.getAllUsers());

    }

//    @GetMapping("/admin/get-users/{userId}")
//    public ResponseEntity<RepResp> getUSerByID(@PathVariable Integer userId){
//        return ResponseEntity.ok(userManagerService.getUsersById(userId));
//
//    }
//
//    @PutMapping("/admin/update/{userId}")
//    public ResponseEntity<RepResp> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres){
//        return ResponseEntity.ok(userManagerService.updateUser(userId, reqres));
//    }
//
    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<RepResp> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
       RepResp response = userManagerService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }
//
//    @DeleteMapping("/admin/delete/{userId}")
//    public ResponseEntity<RepResp> deleteUSer(@PathVariable Integer userId){
//        return ResponseEntity.ok(userManagerService.deleteUser(userId));
//    }


}
