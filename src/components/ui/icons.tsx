type IconProps = React.HTMLAttributes<SVGSVGElement>;

export const Icons = {
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  naver: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z" />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g stroke="currentColor">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="3">
          <animate
            attributeName="stroke-dasharray"
            calcMode="spline"
            dur="1.5s"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            keyTimes="0;0.475;0.95;1"
            repeatCount="indefinite"
            values="0 150;42 150;42 150;42 150"
          />
          <animate
            attributeName="stroke-dashoffset"
            calcMode="spline"
            dur="1.5s"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            keyTimes="0;0.475;0.95;1"
            repeatCount="indefinite"
            values="0;-16;-59;-59"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          dur="2s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </g>
    </svg>
  ),
  emailAdd: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17 7h1v1a1 1 0 0 0 2 0V7h1a1 1 0 0 0 0-2h-1V4a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2m4 4a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.41l5.88 5.89a3 3 0 0 0 4.24 0l2.47-2.47a1 1 0 0 0-1.42-1.42l-2.47 2.47a1 1 0 0 1-1.4 0L5.41 7H13a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1"
      />
    </svg>
  ),
  logout: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
      />
    </svg>
  ),
  barrels: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M266.5 45.39c-19.9 0-39.8 1.51-59.7 4.51c-29.6 26.08-45.4 71.3-45.4 115.4c0 20.2 3.3 39.8 9.6 57c6.5-.3 12.9-.5 19.4-.5c18.5-.8 31.2 0 46.6 2.6c-6.1-18.4-9.1-38.7-9.1-59.1c0-43.7 13.6-89.1 42.1-119.83h-3.5zm28.9 1.14c-32.3 25.42-49.5 72.67-49.5 118.77c0 22.2 3.9 43.6 11.5 61.9c12 1.9 23.9 4.3 35.9 7.2c5.8.2 11.5 1.4 16.9 3.4c-12-21.2-19-48.7-19-78.8c0-31.8 7.8-60.77 21.1-82.38c6.2-10.15 13.9-18.81 22.6-25.13c-13.2-2.3-26.3-3.97-39.5-4.96m-118.3 8.95c-3.2.74-6.5 1.51-9.8 2.33l-.4.1l-.3.1C96.79 69.64 80.62 173.7 118.1 228.1c11.4-2 22.8-3.5 34.2-4.6c-5.9-18.1-8.9-38.1-8.9-58.2c0-39.2 10.9-79.7 33.7-109.82m190.7 2.71c-14.7 0-29 9.74-40.1 27.87c-11.2 18.14-18.5 44.14-18.5 72.94s7.3 54.8 18.5 72.9c11.1 18.2 25.4 27.9 40.1 27.9s29-9.7 40.1-27.9c11.2-18.1 18.5-44.1 18.5-72.9s-7.3-54.8-18.5-72.94c-11.1-18.13-25.4-27.87-40.1-27.87m-.1 134.01h.2c7.2.1 11.6 5.3 13.9 10s3.4 10 3.4 15.9s-1.1 11.2-3.4 15.9s-6.7 9.9-13.9 10h-.2c-7.2-.1-11.6-5.3-13.9-10s-3.4-10-3.4-15.9s1.1-11.2 3.4-15.9s6.7-9.9 13.9-10m-177.3 47.5c-19.8 0-39.7 1.5-59.6 4.5c-29.6 26.1-45.45 71.2-45.45 115.3c0 42 14.04 81.3 40.35 101.9c21.1 3.4 42.2 5.2 63.2 5.2c-25-25.9-37-66.3-37-107c0-43.8 13.5-89.2 42.1-119.9zm29 1.1c-32.4 25.4-49.6 72.7-49.6 118.8c0 45 16.2 87 46.5 106.2q21.3-1.5 42.6-5.1c-8.7-6.4-16.3-15-22.5-25.1c-13.3-21.7-21.1-50.6-21.1-82.4s7.8-60.7 21.1-82.3c6.2-10.1 13.8-18.8 22.4-25.1c-13.2-2.3-26.3-4-39.4-5M101 249.9c-3.31.7-6.5 1.5-9.73 2.3h-.43l-.31.1c-90.831 15.1-90.831 186.8 0 201.9l.31.1h.43l3.65.9c-18.61-25.6-27.52-60.5-27.52-95.7c0-39.1 10.88-79.6 33.6-109.6m190.8 2.5c-14.7 0-28.9 9.8-40.1 27.9s-18.5 44.1-18.5 72.9c0 28.9 7.3 54.8 18.5 73c11.2 18.1 25.4 27.9 40.1 27.9s28.9-9.8 40.1-27.9c11.2-18.2 18.5-44.1 18.5-73c0-28.8-7.3-54.8-18.5-72.9s-25.4-27.9-40.1-27.9m139 0c-8.9.1-17.7 3.7-25.8 10.7c-.2.2-.4.4-.6.5c-4.9 4.4-9.5 10-13.6 16.8c-11.1 18.1-18.4 44-18.4 72.8s7.3 54.8 18.5 72.9C402 444.3 416.3 454 431 454s29-9.7 40.1-27.9c11.2-18.1 18.5-44.1 18.5-72.9s-7.3-54.8-18.5-72.9c-11.1-18.2-25.4-27.9-40.1-27.9zm-139 134.1c7.2 0 11.7 5.2 14.1 9.9c2.3 4.7 3.3 10 3.3 16c0 5.9-1 11.3-3.3 15.9c-2.4 4.8-6.9 9.9-14.1 9.9s-11.7-5.1-14-9.9c-2.4-4.6-3.4-10-3.4-15.9c0-6 1-11.3 3.4-16c2.3-4.7 6.8-9.9 14-9.9m139.1 0h.2c7.2.1 11.6 5.3 13.9 10s3.4 10 3.4 15.9s-1.1 11.2-3.4 15.9s-6.7 9.9-13.9 10h-.2c-7.2-.1-11.6-5.3-13.9-10s-3.4-10-3.4-15.9s1.1-11.2 3.4-15.9s6.7-9.9 13.9-10m-69.5 16.8c-3.5 11.9-8.3 22.8-14.1 32.3c-8.5 13.6-19.4 24.6-31.9 30.8c27.5.9 55.1-.9 82.6-5.7c-8.6-6.3-16.3-15-22.5-25.1c-5.8-9.5-10.6-20.4-14.1-32.3"
      />
    </svg>
  ),
  sun: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <path
          strokeDasharray="34"
          strokeDashoffset="34"
          d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="34;0" />
        </path>
        <g strokeDasharray="2" strokeDashoffset="2">
          <path d="M0 0">
            <animate
              fill="freeze"
              attributeName="d"
              begin="0.375s"
              dur="0.15s"
              values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
            />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.375s" dur="0.15s" values="2;0" />
          </path>
          <path d="M0 0">
            <animate
              fill="freeze"
              attributeName="d"
              begin="0.525s"
              dur="0.15s"
              values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
            />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.525s" dur="0.15s" values="2;0" />
          </path>
          <animateTransform
            attributeName="transform"
            dur="22.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </g>
      </g>
    </svg>
  ),
  moon: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="4"
        strokeDashoffset="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop0"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s;lineMdMoonFilledAltLoop0.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop0.begin+2s;lineMdMoonFilledAltLoop0.begin+4s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop0.begin+1.2s;lineMdMoonFilledAltLoop0.begin+3.2s;lineMdMoonFilledAltLoop0.begin+5.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+1.8s"
            to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+3.8s"
            to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+5.8s"
            to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
          />
        </path>
        <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop1"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.1s;lineMdMoonFilledAltLoop1.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop1.begin+2s;lineMdMoonFilledAltLoop1.begin+4s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop1.begin+1.2s;lineMdMoonFilledAltLoop1.begin+3.2s;lineMdMoonFilledAltLoop1.begin+5.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+1.8s"
            to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+3.8s"
            to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+5.8s"
            to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
          />
        </path>
        <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop2"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="2.9s;lineMdMoonFilledAltLoop2.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop2.begin+2s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop2.begin+1.2s;lineMdMoonFilledAltLoop2.begin+3.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop2.begin+1.8s"
            to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
          />
          <set
            attributeName="d"
            begin="lineMdMoonFilledAltLoop2.begin+5.8s"
            to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
          />
        </path>
      </g>
      <g fillOpacity="0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path
          fill="currentColor"
          strokeDasharray="56"
          strokeDashoffset="56"
          d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0" />
          <animate fill="freeze" attributeName="fill-opacity" begin="1.5s" dur="0.5s" values="0;1" />
        </path>
      </g>
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
      <g fill="none">
        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M5.847 3.549A1.998 1.998 0 0 1 7.794 2h8.412c.93 0 1.738.642 1.947 1.549l1.023 4.431c.988 4.284-1.961 8.388-6.178 8.954A.97.97 0 0 1 13 17v3h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3c0-.022 0-.044.002-.066c-4.216-.566-7.166-4.67-6.177-8.954z"
        />
      </g>
    </svg>
  ),
};
