import iconSuitcase from '../assets/suitcase.svg';
import iconPackage from '../assets/package.svg';
import iconSettings from '../assets/settings.svg';
import { NavLink } from "react-router-dom";

function Menu(props) {

    return (
        <div className="menu">
          <div>
            <NavLink to="/"><img src={iconSuitcase} alt="main" /></NavLink>
          </div>
          <div>
            <NavLink to="/store">
              <img src={iconPackage} alt="store" />
              { props.items ? <span className="menu_badge">{props.items}</span> : null }
            </NavLink>
          </div>
          <div>
            <NavLink to="/settings"><img src={iconSettings} alt="settings" /></NavLink>
          </div>
        </div>
      );
    

  
}
  
export default Menu;
