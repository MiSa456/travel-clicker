import './App.css'
import Suitcase from './components/Suitcase';
import Balance from './components/Balance';
import Booster from './components/Booster';

function App() {

  return (
    <>
      <div>
        <Balance total="157" />
        <Suitcase />
        <Booster value="3.2" />
      </div>  
    </>
  )
}

export default App