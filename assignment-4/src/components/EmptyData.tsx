import EmptyDataImage from '../assets/emptydata.svg'

function EmptyData() {
  return (
    <div className="flex flex-col align-middle justify-center">
      <img className='w-96 h-80' src={EmptyDataImage} alt="emptydata" />
      <p>No record available. Try another page or add a new book</p>
    </div>
  )
}

export default EmptyData
