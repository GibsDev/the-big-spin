import ReactDOM from 'react-dom/client';
import App from './App';

import styles from './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

document.getElementById('styles').innerHTML = `${styles}`;
