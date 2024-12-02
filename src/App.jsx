import { useState } from 'react';
import './App.css'
import Suitcase from './components/Suitcase';
import Balance from './components/Balance';
import Booster from './components/Booster';
import Header from './components/Header';

function App() {

  // Luodaan tilamuuttuja, jossa tallennetaan napautusten määrä.
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    // Kasvatetaan napautusten määrää yhdellä.
    setClicks(clicks + 1);
  }

  return (
    <>
      <div>
        <Header>Travel clicker</Header> 
        <Balance total={clicks} />
        <Suitcase onClick={handleClick} />
        <Booster value="3.2" />
      </div>  
    </>
  )

}

export default App