import Landing from './components/Landing';
import Dock from './components/Dock';

import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear
} from 'react-icons/vsc';

function App() {

  const items = [
    {
      icon: <VscHome size={18} />,
      label: 'Home',
      action: 'home'
    },
    {
      icon: <VscArchive size={18} />,
      label: 'Archive',
      action: 'archive'
    },
    {
      icon: <VscAccount size={18} />,
      label: 'Profile',
      action: 'profile'
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: 'Settings',
      action: 'settings'
    }
  ];

  return (
    <div style={styles.app}>

      {/* Screens */}
      <Landing />

      {/* Dock */}
      <div style={styles.dockWrapper}>
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#000',
    position: 'relative',
    paddingBottom: '80px',
  },

  dockWrapper: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
};

export default App;
