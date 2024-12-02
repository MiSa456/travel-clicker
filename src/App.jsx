import './App.css'
import Suitcase from './components/Suitcase';
import Balance from './components/Balance';

function App() {

  return (
    <>
      <div>
        <Balance total="157" />
        <Suitcase />
      </div>  
    </>
  )
}

export default App