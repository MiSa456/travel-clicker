import './App.css'
import Suitcase from './components/Suitcase';
import Balance from './components/Balance';
import Booster from './components/Booster';
import Header from './components/Header';

function App() {

  return (
    <>
      <div>
        <Header>Travel clicker</Header>
        <Balance total="157" />
        <Suitcase />
        <Booster value="3.2" />
      </div>  
    </>
  )

}

export default App