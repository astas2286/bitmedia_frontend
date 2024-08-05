import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, } from 'react-router-dom';
import App from './App';
import { createTheme,MantineProvider,rem } from '@mantine/core';
import './index.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <MantineProvider theme={theme} defaultColorScheme='dark'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>,
);
