import React from "react";

function Toast({ closeToast, message }) {
  return (
    <div id="successModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Success!</h2>
          <span className="close" onClick={closeToast}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p
            id="toast-message"
            dangerouslySetInnerHTML={{ __html: message }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
