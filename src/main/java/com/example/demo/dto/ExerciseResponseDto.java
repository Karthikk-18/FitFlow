package com.example.demo.dto;

import com.example.demo.entity.ExerciseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseResponseDto {
    private Long id;
    private String name;
    private int sets;
    private ExerciseType Type;
    private Integer reps;
    private Integer duration;
}
