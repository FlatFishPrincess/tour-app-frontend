import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Themes from "./theme";
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import theme from './theme';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
