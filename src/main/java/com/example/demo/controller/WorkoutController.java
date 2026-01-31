package com.example.demo.controller;

import com.example.demo.dto.ExerciseRequestDto;
import com.example.demo.dto.ExerciseResponseDto;
import com.example.demo.dto.WorkoutRequestDto;
import com.example.demo.dto.WorkoutResponseDto;
import com.example.demo.entity.Workout;
import com.example.demo.mapper.WorkoutMapper;
import com.example.demo.service.ExerciseService;
import com.example.demo.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final ExerciseService exerciseService;

    public WorkoutController(WorkoutService workoutService, ExerciseService exerciseService) {
        this.workoutService = workoutService;
        this.exerciseService = exerciseService;
    }

    @PostMapping
    public ResponseEntity<WorkoutResponseDto> createWorkout(
            @Valid @RequestBody WorkoutRequestDto requestDto) {
        Workout workout = WorkoutMapper.addWorkout(requestDto);
        Workout saved = workoutService.createWorkout(workout);

        return ResponseEntity.ok(WorkoutMapper.toResponseDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutResponseDto>  getWorkout(@PathVariable Long id){
        Workout workout = workoutService.loadWorkoutById(id);
        return ResponseEntity.ok(WorkoutMapper.toResponseDto(workout));
    }

    @PostMapping("/{workoutId}/exercises")
    public ResponseEntity<ExerciseResponseDto> addExercise(
            @PathVariable Long workoutId,
            @Valid @RequestBody ExerciseRequestDto dto
    ){
        return ResponseEntity.ok(exerciseService.addExerciseToWorkout(workoutId,dto));
    }

    @GetMapping("/workouts/{workoutId}/exercises")
    public ResponseEntity<List<ExerciseResponseDto>> getExercises(
            @PathVariable Long workoutId
    ){
        return ResponseEntity.ok(exerciseService.getExercisesByWorkoutId(workoutId));
    }

    @DeleteMapping("/exercises/{exerciseId}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long exerciseId) {
        exerciseService.deleteExercise(exerciseId);
        return ResponseEntity.noContent().build();
    }
}
