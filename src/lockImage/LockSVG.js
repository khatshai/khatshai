import React from "react";

function LockSVG({color}) {
  return (
    <div style={{marginRight:'3px'}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.554"
        height="12.061"
        viewBox="0 0 10.554 12.061"
      >
        <path
          id="Icon_awesome-lock"
          data-name="Icon awesome-lock"
          d="M9.423,5.277H8.858v-1.7a3.581,3.581,0,1,0-7.161,0v1.7H1.131A1.131,1.131,0,0,0,0,6.408v4.523a1.131,1.131,0,0,0,1.131,1.131H9.423a1.131,1.131,0,0,0,1.131-1.131V6.408A1.131,1.131,0,0,0,9.423,5.277Zm-2.45,0H3.581v-1.7a1.7,1.7,0,0,1,3.392,0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export default LockSVG;
