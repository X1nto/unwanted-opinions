import { render } from 'solid-js/web';
import Popup from './Popup';
import './index.css';

const appContainer = document.querySelector('#app');
if (!appContainer) {
  throw new Error('#app not found');
}

render(Popup, appContainer);
