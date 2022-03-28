const mediaQueries = {
  xs: `@media (max-width: ${320 / 16}em)`, // iPhone 5
  sm: `@media (max-width: ${834 / 16}em)`, // iPad portrait, mobile, iPhone landscape
  md: `@media (max-width: ${1024 / 16}em)`, // iPad landscape
  lg: `@media (max-width: ${1600 / 16}em)`, // desktop
  xl: `@media (max-width: ${2000 / 16}em)`, // desktop
  ipadPortrait: `@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait)`,
  ipadLandscape: `@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)`,
};

export default mediaQueries;
