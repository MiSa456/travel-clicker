import iconSuitcase from '../assets/suitcase.svg';
import shortenNumber from '../utils/shortenNumber';

// Funktio, joka selvittää kuvan polun suoritusaikana.
function getImageUrl(name) {  
  return new URL(`../assets/items/${name}`, import.meta.url).href;
}

function Item(props) {

  // Selvitetään kuvan url.
  const url = getImageUrl(props.item.image);

  return (
    <div className="item"
    onClick={()=>{props.handlePurchase(props.item.id)}}>
      <div className="item_icon"><img src={url} alt=""/></div>
      <div className="item_desc">
        {props.item.name}<br/>
        {shortenNumber(props.item.price)} <img src={iconSuitcase} alt="travel points" />
      </div>
      <div className="item_qty">{props.item.qty}</div>
    </div>
  );

}

export default Item;
