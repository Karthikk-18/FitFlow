package com.example.demo.repository;

import com.example.demo.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepo extends JpaRepository<Workout, Long> {
}
