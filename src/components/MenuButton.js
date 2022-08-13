import React from "react";
import './MenuButton.css'

function MenuButton({className, clickAction, text}) {

    return (
        <button className={className}
                type="button"
                onClick={clickAction}
                >
            {text}
        </button>
    );
}

// className krijgt de default menu-button mee omdat deze het meest
// toegepast wordt en de className gebruikt wordt in de styling
MenuButton.defaultProps = {
    className: "menu-button",
    clickAction: null
}

export default MenuButton;