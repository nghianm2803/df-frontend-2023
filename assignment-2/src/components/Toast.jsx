import React from "react";

function Toast({ closeToast, message }) {
  return (
    <div className="modal" onClick={closeToast}>
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Success!</h2>
        </div>
        <div className="modalBody">
          <p id="toastMessage">{message}</p>
        </div>
        <div className="loaderSlice">
          <div className="progressBar" />
        </div>
      </div>
    </div>
  );
}

export default Toast;
