import shortenNumber from '../utils/shortenNumber';

function Balance(props) {
  // Poimitaan komponentille välitetty total-arvo
  const total = props.total;

  return (
    <div className="balance">
      <div className="balance_instruction">Click the suitcase to collect travel points!</div>
      <div className="balance_details">
        <div className="balance_label">travel points</div>
        <div className="balance_total">{shortenNumber(total)}</div>
      </div>
    </div>
  );
}

export default Balance;
