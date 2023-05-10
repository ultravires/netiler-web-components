// import NetilerUI from './dist/netiler';
import NetilerUI from '@packages';

NetilerUI.getComponent( 'NtIcon' ).iconURL = 'http://localhost:5173/icons/icons.js';

NetilerUI.define();

window.addEventListener('DOMContentLoaded', () => {
  const button1 = document.getElementById('button1');
  button1.onclick = () => {
    alert('弹窗事件1');
  };

  const button2 = document.getElementById('button2');
  button2.onclick = () => {
    alert('弹窗事件2');
  };
});