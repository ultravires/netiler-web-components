import NetilerUI from '@netiler/web-components';
import '@netiler/web-components/theme';

// NetilerUI.getComponent( 'NtIcon' ).iconURL = 'http://localhost:5173/icons/index.js';

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

  const loadButton = document.getElementById('loadButton');
  loadButton.addEventListener('click', () => {
    console.log('数据正在加载...');
    loadButton.loading = true;
    let timer = setTimeout(() => {
      console.log('数据加载完成...');
      loadButton.loading = false;
      clearTimeout(timer);
      timer = null;
    }, 1000);
  });
});