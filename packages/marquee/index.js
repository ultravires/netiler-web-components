import BaseComponent from '@packages/base';
import style from './index.css?inline' assert { type: 'css' };

export default class NtMarquee extends BaseComponent {
  static componentName = 'nt-marquee';

  static get observedAttributes() {
    return [ 'animation-duration', 'animation-iteration-count' ];
  }

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

  attributeChangedCallback(prop, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (prop === 'animation-duration') {
      this.style.setProperty('--animation-duration', newValue);
      return;
    }
    if (prop === 'animation-iteration-count') {
      this.style.setProperty('--animation-iteration-count', newValue);
      return;
    }
  }
};