import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux'

import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit'

import styles from './styles.scss';
import gameSlice from './gameSlice';

import io from 'socket.io-client';
const socket = io();

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    effect: (action, api) => {
        socket.emit('redux', action);
    }
});

const store = configureStore({
    reducer: gameSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
    <App />
</Provider>);

document.getElementById('styles').innerHTML = `${styles}`;
