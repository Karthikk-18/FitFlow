package com.example.demo.service.impl;

import com.example.demo.dto.ExerciseRequestDto;
import com.example.demo.dto.ExerciseResponseDto;
import com.example.demo.entity.Exercise;
import com.example.demo.entity.ExerciseType;
import com.example.demo.entity.Workout;
import com.example.demo.repository.ExerciseRepository;
import com.example.demo.repository.WorkoutRepo;
import com.example.demo.service.ExerciseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.demo.mapper.ExerciseMapper.toResponseDto;

@Service
@Transactional
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepo workoutRepo;

    public ExerciseServiceImpl(
            ExerciseRepository exerciseRepository,
            WorkoutRepo workoutRepo) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepo = workoutRepo;
    }
    private void validateExerciseByType(ExerciseRequestDto dto){

        if(dto.getType() == ExerciseType.REP_BASED){
            if(dto.getReps() == null || dto.getDuration() != null){
                throw new IllegalArgumentException(
                        "Reps_Based Exercise must have reps only"
                );
            }
        }

        if(dto.getType() == ExerciseType.TIME_BASED){
            if(dto.getDuration() == null || dto.getReps() != null){
                throw new IllegalArgumentException(
                        "Duration_Based Exercise must have Duration Time only"
                );
            }
        }
    }

    @Override
    public ExerciseResponseDto addExerciseToWorkout(Long workoutId, ExerciseRequestDto dto) {
       validateExerciseByType(dto);

       Workout workout = workoutRepo.findById(workoutId)
               .orElseThrow(() -> new RuntimeException("Workout not found"));

        Exercise exercise = new Exercise();
        exercise.setName(dto.getName());
        exercise.setSets(dto.getSets());
        exercise.setType(dto.getType());

        if(dto.getType() == ExerciseType.REP_BASED){
            exercise.setReps(dto.getReps());
            exercise.setDuration(null);
        }else{
            exercise.setDuration(dto.getDuration());
            exercise.setReps(null);
        }

        exercise.setWorkout(workout);

        return toResponseDto(exerciseRepository.save(exercise));
    }

    @Override
    public ExerciseResponseDto updateExercise(Long exerciseId, ExerciseRequestDto dto) {
        return null;
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        if (!exerciseRepository.existsById(exerciseId)) {
            throw new RuntimeException("Exercise not found");
        }
        exerciseRepository.deleteById(exerciseId);
    }

    @Override
    public List<ExerciseResponseDto> getExercisesByWorkoutId(Long workoutId) {
        return exerciseRepository.findByWorkoutId(workoutId)
                .stream()
                .map(com.example.demo.mapper.ExerciseMapper::toResponseDto)
                .toList();
    }
}
