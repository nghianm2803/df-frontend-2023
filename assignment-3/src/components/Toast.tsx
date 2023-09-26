import React from 'react'

interface ToastProps {
  closeToast: () => void
  message: string
}

function Toast({ closeToast, message }: ToastProps): JSX.Element {
  return (
    // Semantic check
    <button id="successModal" className="toast" onClick={closeToast}>
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Success!</h2>
          <button className="close" onClick={closeToast}>
            &times;
          </button>
        </div>
        <div className="modalBody">
          <p id="toastMessage" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        <div className="loaderSlice">
          <div className="progressBar" />
        </div>
      </div>
    </button>
  )
}

export default Toast
