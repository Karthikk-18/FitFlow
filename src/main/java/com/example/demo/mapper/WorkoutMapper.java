package com.example.demo.mapper;

import com.example.demo.dto.ExerciseRequestDto;
import com.example.demo.dto.ExerciseResponseDto;
import com.example.demo.dto.WorkoutRequestDto;
import com.example.demo.dto.WorkoutResponseDto;
import com.example.demo.entity.Exercise;
import com.example.demo.entity.Workout;

import java.util.List;
import java.util.stream.Collectors;

public class WorkoutMapper {
    public static Workout addWorkout(WorkoutRequestDto dto){
        Workout workout = new Workout();
        workout.setTitle(dto.getTitle());

        if(dto.getExercises() != null){
            List<Exercise> exercises = dto.getExercises()
                    .stream()
                    .map( exDto -> {
                                Exercise exercise = new Exercise();
                                exercise.setName(exDto.getName());
                                exercise.setSets(exDto.getSets());
                                exercise.setType(exDto.getType());
                                exercise.setWorkout(workout);
                                return exercise;
                            })
                    .collect(Collectors.toList());
            workout.setExercises(exercises);
        }
        return workout;
    }

    public static WorkoutResponseDto toResponseDto(Workout workout){
        WorkoutResponseDto dto = new WorkoutResponseDto();

        dto.setId(workout.getId());
        dto.setTitle(workout.getTitle());
        dto.setCreatedAt(workout.getCreatedAt());

        if(workout.getExercises() != null){
            List<ExerciseResponseDto> exercises = workout.getExercises()
                    .stream()
                    .map( ex -> {
                        ExerciseResponseDto exDto = new ExerciseResponseDto();
                        exDto.setId(ex.getId());
                        exDto.setName(ex.getName());
                        exDto.setSets(ex.getSets());
                        exDto.setType(ex.getType());
                        return exDto;
                    })
                    .collect(Collectors.toList());
            dto.setExercises(exercises);
        }
        return dto;
    }

}
