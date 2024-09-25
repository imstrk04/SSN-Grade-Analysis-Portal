// App.js
import React, { useState } from 'react';
import Navbar from './Navbar';

const App = () => {
  const [rollNumberStart, setRollNumberStart] = useState('');
  const [rollNumberEnd, setRollNumberEnd] = useState('');

  return (
    <div>
      <Navbar 
        setRollNumberStart={setRollNumberStart} 
        setRollNumberEnd={setRollNumberEnd} 
        rollNumberStart={rollNumberStart} 
        rollNumberEnd={rollNumberEnd} 
      />
    </div>
  );
};

export default App;
