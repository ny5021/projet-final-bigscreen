import React from "react";

const Bigscreen = ({ ...props }) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 392 56"
      fill="currentColor"
      {...props}
    >
      <rect className="cls-1" x="48" y="8" width="8" height="40" />
      <path className="cls-1" d="M8,8V0H0V48H40V8H8ZM32,40H8V16H32Z" />
      <path
        className="cls-1"
        d="M72,8H64V40H96v8H72v8h32V8H72ZM96,32H72V16H96Z"
      />
      <polygon
        className="cls-1"
        points="119 8 112 8 112 32 113 32 120 32 144 32 144 40 112 40 112 48 144 48 152 48 152 40 152 32 152 24 144 24 120 24 120 16 152 16 152 8 120 8 119 8"
      />
      <polygon
        className="cls-1"
        points="160 8 160 16 160 48 163 48 168 48 200 48 200 40 168 40 168 16 200 16 200 8 168 8 160 8"
      />
      <polygon
        className="cls-1"
        points="212 8 208 8 208 48 216 48 216 16 248 16 248 8 216 8 212 8"
      />
      <path
        className="cls-1"
        d="M264,8h-8V48h40V40H264V32h32V8H264Zm25,16H264V16h25Z"
      />
      <path
        className="cls-1"
        d="M312,8h-8V48h40V40H312V32h32V8H312Zm24,16H312V16h24Z"
      />
      <polygon
        className="cls-1"
        points="384 8 360 8 352 8 352 16 352 48 360 48 360 16 384 16 384 48 392 48 392 16 392 8 384 8"
      />
    </svg>
  );
};

export default Bigscreen;
