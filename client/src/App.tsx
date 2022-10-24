import React from 'react';
import './scss/main.scss';
import PassportSwapForm from './components/PassportSwapForm';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
       <PassportSwapForm />
    </div>
  );
}

export default App;
