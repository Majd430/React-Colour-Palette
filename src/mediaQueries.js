// X-Small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// X-Large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

// XX-Large devices (larger desktops, 1400px and up)
// @media (min-width: 1400px) { ... }

export default {
  up(size) {
    const sizes = {
      xs: "0",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    };
    return `@media (min-width: ${sizes[size]})`;
  },
  down(size) {
    const sizes = {
      xs: "0",
      sm: "575.98px",
      md: "767.98px",
      lg: "991.98px",
      xl: "1199.98px",
      xxl: "1399.98px",
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};
