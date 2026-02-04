package com.example.demo.dto;

import jakarta.validation.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {
    @NotBlank(message = "username is required")
    @Size(min = 5, max = 25, message = "username must be between 5 to 35 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Emial must be valid")
    private String email;

    @Size(min = 6, message = "Password must be atleast 6 characters")
    private String password;
}
