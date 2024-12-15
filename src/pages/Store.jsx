import Header from '../components/Header';
import Item from '../components/Item';
import getPurchasableItems from '../utils/getPurchasableItems';

function Store(props) {
  const items = getPurchasableItems(props.storeitems).map(item => (
    <Item key={item.id}
          item={item}
          handlePurchase={props.handlePurchase} 
          disabled={props.stats.balance < item.price} />
  ));

  return (
    <div className="container">
      <Header balance={props.stats.balance}>Store</Header>
      <div className="scrollbox items">
        {items}
      </div>

      {/* Näytetään loppuviesti, jos peli on päättynyt */}
      {props.isGameFinished && (
        <div className="game-finished-message">
          <h2>Congratulations! You've visited every country on your list!</h2>
          <p>Ready for another round?</p>
        </div>
      )}
    </div>
  );
}

export default Store;
