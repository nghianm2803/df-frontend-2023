import EmptyDataImage from "../assets/emptydata.svg";

function EmptyData() {
  return (
    <div className="emptydata">
      <p>No record available</p>
      <img src={EmptyDataImage} alt="emptydata" />
    </div>
  );
}

export default EmptyData;
