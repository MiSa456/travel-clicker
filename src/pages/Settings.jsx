import Header from '../components/Header';
import Stat from '../components/Stat';

function Settings(props) {
  return (
    <div className="container">   
      <Header balance={props.stats.balance}>settings</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>Travel stats</h2>
          <div>
            <Stat title="in bank" value={props.stats.balance} />
            <Stat title="per click" value={props.stats.increase} />
            <Stat title="collected" value={props.stats.collected} />
            <Stat title="clicks" value={props.stats.clicks} />
            <Stat title="upgrades" value={props.stats.upgrades} />
            <Stat title="countries visited" value={props.stats.countriesVisited} />
          </div>
        </div>
        TODO reset
      </div>
    </div>
  );
}

export default Settings;
