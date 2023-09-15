import { useState } from 'react';
import './App.css';
import TripInfo from './TripInfo';
import CountdownPage from './CountdownPage';

function App() {
  const [time, setTime] = useState('16:30');
  const [tripTitle, setTripTitle] = useState('');
  const [startedCountdown, setStartedCountdown] = useState(false);

  function handleClick() {
    if (time && tripTitle) {
      setStartedCountdown(true);
    } else {
      // Don't do anything
    }
  }

  if (startedCountdown) {
    return (
      <CountdownPage
        time={time}
        tripTitle={tripTitle}
      />
    );
  } else {
    return (
      <TripInfo
        time={time}
        setTime={setTime}
        tripTitle={tripTitle}
        setTripTitle={setTripTitle}
        onStartCountdownClick={handleClick}
      />
    );
  }
}

export default App;
