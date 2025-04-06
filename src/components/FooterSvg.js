// src/components/FooterSvg.js
import React from "react";
import Svg, { Path } from "react-native-svg";

const FooterSvg = ({ icon }) => {
  switch (icon) {
    case "home":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15C14.45 21 14 20.55 14 20V15H10V20C10 20.55 9.55 21 9 21H4C3.45 21 3 20.55 3 20V9.5Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "summon":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "devtools":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M14.7 6.3A5 5 0 0 0 6.3 14.7L3 18V21H6L9.3 17.7A5 5 0 0 0 17.7 9.3L21 6V3H18L14.7 6.3Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "minigames":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M8 2L16 2C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2ZM12 18C12.55 18 13 18.45 13 19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19C11 18.45 11.45 18 12 18ZM11 6V16H13V6H11Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "news":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 4H20V20H5C4.44772 20 4 19.5523 4 19V4Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8 8H16M8 12H14M8 16H12"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );
    case "settings":
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            d="M10.325 4.317C10.57 3.383 11.43 2.75 12.4 2.75C13.37 2.75 14.23 3.383 14.475 4.317L14.696 5.167C15.37 5.303 16.008 5.56 16.582 5.926L17.422 5.28C18.219 4.68 19.336 4.803 20.015 5.536C20.693 6.269 20.704 7.375 20.042 8.099L19.322 8.899C19.569 9.551 19.706 10.255 19.706 11C19.706 11.745 19.569 12.449 19.322 13.101L20.042 13.901C20.704 14.625 20.693 15.731 20.015 16.464C19.336 17.197 18.219 17.32 17.422 16.72L16.582 16.074C16.008 16.44 15.37 16.697 14.696 16.833L14.475 17.683C14.23 18.617 13.37 19.25 12.4 19.25C11.43 19.25 10.57 18.617 10.325 17.683L10.104 16.833C9.429 16.697 8.791 16.44 8.217 16.074L7.377 16.72C6.581 17.32 5.463 17.197 4.785 16.464C4.106 15.731 4.096 14.625 4.758 13.901L5.478 13.101C5.231 12.449 5.094 11.745 5.094 11C5.094 10.255 5.231 9.551 5.478 8.899L4.758 8.099C4.096 7.375 4.106 6.269 4.785 5.536C5.463 4.803 6.581 4.68 7.377 5.28L8.217 5.926C8.791 5.56 9.429 5.303 10.104 5.167L10.325 4.317Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    default:
      return null;
  }
};

export default FooterSvg;
