import BaseComponent from '@packages/base';
import style from './index.css?inline' assert { type: 'css' };

export default class NtMarquee extends BaseComponent {
  static componentName = 'nt-marquee';

  constructor() {
    super();
    this.adoptStyleSheet(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div class="nt-marquee">
      <div class="nt-marquee__content">
        <slot></slot>
      </div>
    </div>
    `;
  }
};