package com.example.demo.mapper;

import com.example.demo.dto.ExerciseResponseDto;
import com.example.demo.entity.Exercise;

public class ExerciseMapper {

    public static ExerciseResponseDto toResponseDto(Exercise exercise){
          ExerciseResponseDto dto = new ExerciseResponseDto();

          dto.setId(exercise.getId());
          dto.setName(exercise.getName());
          dto.setSets(exercise.getSets());
          dto.setType(exercise.getType());
          dto.setReps(exercise.getReps());
          dto.setDuration(exercise.getDuration());

          return dto;
    }
}
