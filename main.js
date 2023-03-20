import './style.css';
import Timer from './timer.js';

let app = document.getElementById('app');

let timer = new Timer();

timer.mount(app);
// set timer to 0
timer.stopTimer();
