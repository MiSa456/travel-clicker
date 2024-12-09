import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Suitcase from '../components/Suitcase';

function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>Travel clicker</Header>
      <Balance total={props.stats.clicks} />
      <Suitcase onClick={props.handleClick} />
      <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;
