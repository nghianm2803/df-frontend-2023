import React from 'react'

interface ToastProps {
  closeToast: () => void
  message: string
}

function Toast({ closeToast, message }: ToastProps): JSX.Element {
  return (
    <div id="successModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Success!</h2>
          <button className="close" onClick={closeToast}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p id="toast-message" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
    </div>
  )
}

export default Toast
