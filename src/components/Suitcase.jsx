import suitcase from '../assets/suitcase-big.svg'

function Suitcase(props) {
  return (
    <div className="suitcase">
      <img src={suitcase} alt="suitcase" onClick={props.onClick} />
    </div>
  );
}
  
export default Suitcase;
