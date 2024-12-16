import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Suitcase from '../components/Suitcase';
import iconPalm from '../assets/palm.svg';

function Clicker(props) {
  return (
    <div className="container clicker">
       <div className="header-container">
        <Header>Travel clicker</Header>
        <img src={iconPalm} alt="Palm Icon" className="palm-icon" />
      </div>
      <Balance total={props.stats.balance} />
      <Suitcase onClick={props.handleClick} />
      <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;
