import Header from '../components/Header';
import Stat from '../components/Stat';
import Reset from '../components/Reset';

function Settings(props) {
  return (
    <div className="container">   
      <Header balance={props.stats.balance}>Settings</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>Travel stats</h2>
          <div>
            <Stat title="travel points in bank" value={props.stats.balance} />
            <Stat title="travel points per click" value={props.stats.increase} />
            <Stat title="total travel points collected" value={props.stats.collected} />
            <Stat title="total clicks" value={props.stats.clicks} />
            <Stat title="upgrades" value={props.stats.upgrades} />
            <Stat title="countries visited" value={props.stats.countriesVisited} />
          </div>
  
          <div className="visited-countries">
            <h3>Visited Countries</h3>
            <ul>
              {props.stats.visitedCountries.length > 0 ? (
                props.stats.visitedCountries.map((country, index) => (
                  <li key={index}>{country}</li>
                ))
              ) : (
                <li>No countries visited yet</li>
              )}
            </ul>
          </div>

        </div>
        <Reset resetvalue={props.stats.clicks}
               handleReset={props.handleReset} />
      </div>
    </div>
  );
}

export default Settings;