import { useState } from 'react';
import StarBorder from './StarBorder';
import CreateWorkout from './WorkoutBuilder';

function Landing() {
  const [start, setStart] = useState(false);

  if (start) {
    return <CreateWorkout />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.quote}>
        Your journey to fitness starts here.
      </h1>

      <div style={{ marginTop: '28px' }}>
        <StarBorder
          as="button"
          color="white"
          speed="4s"
          onClick={() => setStart(true)}
        >
          Get Started
        </StarBorder>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '30%',
    width: '100%',
    textAlign: 'center',
    transform: 'translateY(-50%)',
  },

  quote: {
    fontSize: '2.5rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: '#ffffff',
    opacity: 0.6,
    textShadow: `
      0 0 10px rgba(255,255,255,0.25),
      0 0 30px rgba(255,255,255,0.15)
    `,
  }
};

export default Landing;
