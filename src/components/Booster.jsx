import shortenNumber from '../utils/shortenNumber';

function Booster(props) {

    // Poimitaan komponentille välitetty value-arvo
    const value = props.value;
  
    return (
      <div className="booster">
        {shortenNumber(value)} travel points / click
      </div>
    );
  
  }
  
  export default Booster;
  