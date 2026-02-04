package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequestDto {
    @NotBlank(message = "Enter email or username")
    private String emailOrUsername;

    @NotBlank(message = "Password is required")
    private String password;
}
