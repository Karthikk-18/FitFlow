import { useState } from "react";
import 

function WorkoutBuilder() {
  // Workout state
  const [workoutName, setWorkoutName] = useState("");

  // Exercise input state
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("reps"); // reps | time

  // Added exercises
  const [exercises, setExercises] = useState([]);

  function addExercise() {
    if (!exerciseName || !sets) return;

    const newExercise = {
      id: Date.now(),
      name: exerciseName,
      sets: Number(sets),
      mode,
      value: mode === "reps" ? Number(value || 0) : Number(value || 0),
    };

    setExercises([...exercises, newExercise]);

    // reset inputs
    setExerciseName("");
    setSets("");
    setValue("");
  }

  return (
    <div style={styles.wrapper}>
      {/* Workout name */}
      <h2 style={styles.title}>
        {workoutName || "Create Workout"}
      </h2>

      <input
        style={styles.workoutInput}
        placeholder="Workout name (e.g. Chest & Triceps Day)"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />

      {/* Add exercise */}
      <div style={styles.card}>
        <h4>Add New Exercise</h4>

        <input
          style={styles.input}
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />

        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="Sets"
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder={mode === "reps" ? "Target reps" : "Seconds"}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Mode toggle */}
        <div style={styles.mode}>
          <button
            style={mode === "reps" ? styles.activeMode : styles.modeBtn}
            onClick={() => setMode("reps")}
          >
            Reps Based
          </button>
          <button
            style={mode === "time" ? styles.activeMode : styles.modeBtn}
            onClick={() => setMode("time")}
          >
            Time Based
          </button>
        </div>

        <button style={styles.addBtn} onClick={addExercise}>
          + Add to Workout
        </button>
      </div>

      {/* Added exercises */}
      <div style={styles.list}>
        {exercises.map((ex) => (
          <div key={ex.id} style={styles.exerciseItem}>
            <strong>{ex.name}</strong>
            <span>
              {ex.sets} sets •{" "}
              {ex.mode === "reps"
                ? `${ex.value} reps`
                : `${ex.value} sec`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutBuilder;
