package com.example.demo.service.impl;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.util.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("Email already exists");
        }

        if(userRepository.existsByUsername(request.getUsername())){
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User(
                null,
                request.getUsername(),
                request.getEmail(),
                null,
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );

        return new AuthResponseDto(
          token,
          savedUser.getId(),
          savedUser.getUsername(),
          savedUser.getEmail()
        );
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmailOrUsername())
                .or(() -> userRepository.findByUsername(request.getEmailOrUsername()))
                .orElseThrow(() -> new BadCredentialsException("Invalid Credentials"));

        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new BadCredentialsException("Invalid Credentials");
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );

        return new AuthResponseDto(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
