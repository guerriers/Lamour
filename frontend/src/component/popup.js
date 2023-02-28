import React from "react";
import '../css/component/popup.css'

const popup = (props) => {
    return(props.trigger) ? (
        <div className="wrapper_popup">
            <div className="background"></div>
            <div className="popup">
                <div className="popup_inner">
                    <button className="close_btn" onClick={() => props.setTrigger(false)}>Close</button>
                    {props.children}
                </div>
            </div>
        </div>
    ) : ""
}

export default popup;