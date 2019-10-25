import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alert = alert => {
  console.log(alert);
  return (
    alert != null && (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={["fas", "info-circle"]} /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
