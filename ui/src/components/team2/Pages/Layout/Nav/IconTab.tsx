import React from "react";
import "./index.css";

interface hocProp {
    children: JSX.Element,
    text: string,
    active?: boolean
};

const IconTab: React.FC<hocProp> = ({ children, text, active }: hocProp) => {
    return (
        <li title={text} className={`icon-tab ${active ? "active" : ""}`}>
            <span className="icon">
                {children}
            </span>
            <span className="text">
                {text}
            </span>
        </li>
    );
};

export default IconTab;
