import BaseComponent from "@packages/base";
import style from './index.css';

export default class NtLoading extends BaseComponent {
  static componentName = 'nt-loading';

  constructor() {
    super();

    this.adoptStyleSheet( style );

    this.shadowRoot.innerHTML = `
    <svg class="loading" viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'>
      <path fill-rule='evenodd' clip-rule='evenodd' d='M14.624 9.08A40 40 0 0 1 40 0c5.523 0 10 4.477 10 10s-4.477 10-10 10a20 20 0 1 0 14.142 5.858l14.142-14.142a40 40 0 1 1-53.66-2.636z'/>
    </svg>
    `;
  }
}
