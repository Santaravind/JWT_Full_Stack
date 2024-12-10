package com.Sant.SpringNewSecurity.service;

import com.Sant.SpringNewSecurity.dto.RepResp;
import com.Sant.SpringNewSecurity.entity.OurUsers;
import com.Sant.SpringNewSecurity.repositery.UserRepository;

//import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagerService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RepResp register(RepResp registerRequest){
        RepResp resp =new RepResp();

        try {
            OurUsers ourUsers =new OurUsers();
            ourUsers.setEmail(registerRequest.getEmail());
            ourUsers.setName(registerRequest.getName());
            ourUsers.setCity(registerRequest.getCity());
            ourUsers.setRole(registerRequest.getRole());
            ourUsers.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            OurUsers ourUserResult =repo.save(ourUsers);

            if (ourUserResult.getId()>0){
                resp.setOurUsers(ourUserResult);
                resp.setMessage("User Saved SuccessFully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }

        return resp;
    }

    public  RepResp login(RepResp loginRequest){
        RepResp response=new RepResp();


        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var user=repo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt=jwtUtils.generateToken(user);
            var refresToken=jwtUtils.generateRefreshToken(new HashMap<>(),user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refresToken);
            response.setExpirationTime("24hr");
            response.setMessage("Successfully Login In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }

        return response;
    }

    public RepResp refresToken(RepResp refreshTokenReqiest){
        RepResp response=new RepResp();
        try{
            String ourEmail =jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            OurUsers users=repo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.istokenValid(refreshTokenReqiest.getToken(),users)){
                var jwt =jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24hr");
                response.setMessage("Succesfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;


        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;

        }
    }
    public RepResp getAllUsers() {
        RepResp reqRes = new RepResp();

        try {
            List<OurUsers> result = repo.findAll();
            if (!result.isEmpty()) {
                reqRes.setOurUsersList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }


    public RepResp getUsersById(Integer id) {
        RepResp reqRes = new RepResp();
        try {
            OurUsers usersById = repo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurUsers(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }


    public RepResp deleteUser(Integer userId) {
        RepResp reqRes = new RepResp();
        try {
            Optional<OurUsers> userOptional = repo.findById(userId);
            if (userOptional.isPresent()) {
                repo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public RepResp updateUser(Integer userId, OurUsers updatedUser) {
        RepResp reqRes = new RepResp();
        try {
            Optional<OurUsers> userOptional = repo.findById(userId);
            if (userOptional.isPresent()) {
                OurUsers existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setCity(updatedUser.getCity());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                OurUsers savedUser = repo.save(existingUser);
                reqRes.setOurUsers(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }


    public RepResp getMyInfo(String email){
        RepResp reqRes = new RepResp();
        try {
            Optional<OurUsers> userOptional = repo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }


}
