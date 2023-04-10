import React from "react";

function MaphidroIcon({ className = "" }: { className?: string }) {
  return (
    <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    x="0"
    y="0"
    version="1.1"
    viewBox="-0.258 -0.548 260 260"
    xmlSpace="preserve"
  >
    <g>
      <path
        fill="#fff"
        d="M133.399 128.737c-6.766 0-12.273 5.5-12.273 12.266v94.016c0 6.766 5.508 12.273 12.273 12.273h94c6.758 0 12.258-5.508 12.258-12.273v-94.016c0-6.766-5.5-12.266-12.258-12.266z"
      ></path>
      <path
        fill="#2ebdeb"
        stroke="none"
        strokeWidth="1"
        d="M126.845-.586c-30.447 54.688-89.12 114.088-84.282 181.189 6.511 90.337 137.947 109.16 169.407 24.158C239.31 130.893 165.685 58.33 132.884-.586h-6.04M81.763 135.068c7.564-1.157 9.625 6.538 9.164 12.375-1.884 23.847-8.748 44.152 14.91 60.778 7.84 5.51 24.518 6.027 29.807 13.855 3.719 5.504-.687 11.828-6.228 13.568-35.226 11.063-62.913-35.759-62.878-64.1.012-10.098 1.939-34.444 15.225-36.476z"
      ></path>
      <text
        xmlSpace="preserve"
        style={{ lineHeight: "1.25" }}
        x="92.834"
        y="191.754"
        fill="#fff"
        fillOpacity="1"
        stroke="none"
        strokeWidth="1"
        fontFamily="sans-serif"
        fontSize="64"
        fontStyle="normal"
        fontWeight="normal"
      >
        <tspan
          x="92.834"
          y="191.754"
          style={{}}
          strokeWidth="1"
          fontFamily="Verdana"
          fontSize="64"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="bold"
        >
          MH
        </tspan>
      </text>
    </g>
  </svg>
  );
}

export default MaphidroIcon;