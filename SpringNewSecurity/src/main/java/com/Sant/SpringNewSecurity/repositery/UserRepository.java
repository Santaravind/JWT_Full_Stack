package com.Sant.SpringNewSecurity.repositery;

import com.Sant.SpringNewSecurity.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<OurUsers,Integer> {
         Optional<OurUsers> findByEmail(String email);

}
