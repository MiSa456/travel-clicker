import iconSuitcase from '../assets/suitcase.svg';
import iconPackage from '../assets/package.svg';
import iconSettings from '../assets/settings.svg';

function Menu(props) {

  return (
    <div className="menu">
      <div>
        <img src={iconSuitcase} alt="main" />
      </div>
      <div>
        <img src={iconPackage} alt="store" />
        { props.items ? <span className="menu_badge">{props.items}</span> : null }
      </div>
      <div>
        <img src={iconSettings} alt="settings" />
      </div>
    </div>
  );
  
}
  
export default Menu;
