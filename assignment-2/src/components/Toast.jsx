import React from "react";

function Toast({ closeToast, message }) {
  return (
    <div id="successModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Success!</h2>
          <span class="close" onClick={closeToast}>
            &times;
          </span>
        </div>
        <div class="modal-body">
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
