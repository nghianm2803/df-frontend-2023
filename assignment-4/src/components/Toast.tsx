import React from 'react'

interface ToastProps {
  closeToast: () => void
  message: string
}

function Toast({ closeToast, message }: ToastProps): JSX.Element {
  return (
    // Semantic check
    <button
      className="fixed block w-full h-full top-0 left-0 right-0 bottom-0 cursor-pointer"
      onClick={closeToast}
    >
      <div className="m-auto bg-white p-5 border rounded-md w-96">
        <div className="flex flex-row justify-between">
          <h2 className="text-gray-800 font-bold text-2xl">Success!</h2>
          <button className="btn-close" onClick={closeToast}>
            &times;
          </button>
        </div>
        <div className="flex flex-col align-middle justify-center text-center m-3">
          <p className="text-center" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        <div className="loaderSlice">
          <div className="progressBar" />
        </div>
      </div>
    </button>
  )
}

export default Toast
