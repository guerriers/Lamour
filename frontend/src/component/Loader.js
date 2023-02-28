import React from "react";
import "../css/component/loader.css";

function Loader() {
  return (
    <div>
    <div className="bg-blur"></div>
      <div className="page-loader">

        <div className="boxloader">
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
