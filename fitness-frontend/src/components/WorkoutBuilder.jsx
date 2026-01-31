import { useState } from "react";

function WorkoutBuilder() {
  const [title, setTitle] = useState("");
  const [workoutId, setWorkoutId] = useState(null);
  const [savingWorkout, setSavingWorkout] = useState(false);

  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [value, setValue] = useState("");
  const [Type, setType] = useState("reps");

  const [exercises, setExercises] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  async function saveWorkout() {
    if (!title) return;

    try {
      setSavingWorkout(true);

      const res = await fetch("http://localhost:8080/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      setWorkoutId(data.id);
    } catch (err) {
      console.error("Failed to create workout", err);
    } finally {
      setSavingWorkout(false);
    }
  }

  async function addExercise() {
    if (!name || !sets || !workoutId) return;

    const payload =
      Type === "reps"
        ? {
            name,
            sets: Number(sets),
            Type: "REP_BASED",
            reps: Number(value),
            duration: null,
          }
        : {
            name,
            sets: Number(sets),
            Type: "TIME_BASED",
            reps: null,
            duration: Number(value),
          };

    try {
      const res = await fetch(
        `http://localhost:8080/api/workout/${workoutId}/exercises`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to add exercise:", errorText);
        return;
      }

      const savedExercise = await res.json();

      setExercises((prev) => [...prev, savedExercise]);

      setName("");
      setSets("");
      setValue("");
    } catch (err) {
      console.error("Failed to add exercise", err);
    }
  }

  async function deleteExercise(exerciseId) {
    if(!exerciseId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this exercise?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(exerciseId);

      const res = await fetch(
        `http://localhost:8080/api/workout/exercises/${exerciseId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to delete exercise:", errorText);
        return;
      }

      setExercises((prev) =>
        prev.filter((ex) => ex.id !== exerciseId)
      );
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>{title || "Create Workout"}</h2>

      <input
        style={styles.workoutInput}
        placeholder="Workout name (e.g. Chest & Triceps Day)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        readOnly={!!workoutId}
      />

      {!workoutId && (
        <button
          style={styles.primaryBtn}
          onClick={saveWorkout}
          disabled={savingWorkout}
        >
          {savingWorkout ? "Saving..." : "Save Workout"}
        </button>
      )}

      <div style={{ position: "relative", marginTop: "24px" }}>
        <div style={styles.card}>
          <h4>Add New Exercise</h4>

          <input
            style={styles.input}
            placeholder="Exercise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div style={styles.row}>
            <input
              style={styles.input}
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder={Type === "reps" ? "Target reps" : "Seconds"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div style={styles.type}>
            <button
              style={Type === "reps" ? styles.activeMode : styles.typeBtn}
              onClick={() => setType("reps")}
            >
              Reps Based
            </button>
            <button
              style={Type === "time" ? styles.activeMode : styles.typeBtn}
              onClick={() => setType("time")}
            >
              Time Based
            </button>
          </div>

          <button style={styles.addBtn} onClick={addExercise}>
            + Add to Workout
          </button>
        </div>

        {!workoutId && (
          <div style={styles.lockOverlay}>
            <p style={styles.lockText}>
              Save workout to start adding exercises
            </p>
          </div>
        )}
      </div>

      <div style={styles.list}>
        {exercises.map((ex) => (
          <div key={ex.id} style={styles.exerciseItem}>
            <div>
              <strong>{ex.name}  •  </strong>
              <span>
                {ex.sets} sets •{" "}
                {ex.Type === "REP_BASED"
                  ? `${ex.reps} reps`
                  : `${ex.duration} sec`}
              </span>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteExercise(ex.id)}
              disabled={deletingId === ex.id}
            >
              {deletingId === ex.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutBuilder;

const styles = {
  wrapper: {
    maxWidth: "600px",
    margin: "0 auto",
    paddingTop: "80px",
    color: "white",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "12px",
  },
  workoutInput: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    marginBottom: "12px",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#6366f1",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  type: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
  },
  typeBtn: {
    flex: 1,
    padding: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
  },
  activeMode: {
    flex: 1,
    padding: "10px",
    background: "#6366f1",
    border: "none",
    borderRadius: "10px",
    color: "white",
  },
  addBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "#6366f1",
    border: "none",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
  lockOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lockText: {
    fontSize: "14px",
    opacity: 0.85,
  },
  list: {
    marginTop: "24px",
  },
  exerciseItem: {
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    background: "#ef4444",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "6px 10px",
    cursor: "pointer",
  },
};
