const Bg = () => {
  return (
    <svg
      id="bg"
      width="1512"
      height="906"
      viewBox="0 0 1512 906"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_90_4582)">
        <rect width="1512" height="906" fill="#F6F6FA" />
        <g opacity="0.25" filter="url(#filter0_f_90_4582)">
          <circle cx="1512" cy="9" r="250" fill="#FF6E41" />
        </g>
        <g opacity="0.25" filter="url(#filter1_f_90_4582)">
          <circle cy="906" r="250" fill="#4176FF" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_90_4582"
          x="762"
          y="-741"
          width="1500"
          height="1500"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="250"
            result="effect1_foregroundBlur_90_4582"
          />
        </filter>
        <filter
          id="filter1_f_90_4582"
          x="-750"
          y="156"
          width="1500"
          height="1500"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="250"
            result="effect1_foregroundBlur_90_4582"
          />
        </filter>
        <clipPath id="clip0_90_4582">
          <rect width="1512" height="906" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Bg;
