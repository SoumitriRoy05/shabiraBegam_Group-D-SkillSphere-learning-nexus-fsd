package com.skillsphere.backend.config;

import com.skillsphere.backend.model.User;
import com.skillsphere.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed default test user sroy@gmail.com
        createTestUserIfMissing("sroy", "S Roy", "sroy@gmail.com", "1234", "STUDENT");
        createTestUserIfMissing("student", "Student Demo", "student@skillsphere.com", "1234", "STUDENT");
        createTestUserIfMissing("employee", "Employee Demo", "employee@skillsphere.com", "1234", "EMPLOYEE");
        createTestUserIfMissing("manager", "Manager Demo", "manager@company.com", "1234", "EMPLOYEE");
    }

    private void createTestUserIfMissing(String username, String fullName, String email, String password, String role) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setFullName(fullName);
            user.setEmail(email);
            user.setPasswordHash(passwordEncoder.encode(password));
            user.setRole(role);
            user.setProvider("LOCAL");
            user.setIsActive(true);
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
            System.out.println("✅ DataInitializer: Created test user -> " + email);
        }
    }
}
