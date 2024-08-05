import React from "react";
import stylesDark from './css/DarkBGComponent.module.css';
import stylesLight from './css/LigthtBGComponent.module.css';
import { useComputedColorScheme } from "@mantine/core";

const BGComponent = ({ children }) => {
  const computedColorScheme = useComputedColorScheme('light');
  return (
    <div>
      <div className={computedColorScheme === 'light' ? stylesLight.background : stylesDark.background}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={stylesDark.content}>
        {children}
      </div>
    </div>
  );
};

export default BGComponent;
