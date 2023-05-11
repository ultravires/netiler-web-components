import BaseComponent from "@packages/base";
import style from './index.css?inline' assert { type: 'css' };

export default class NtHeader extends BaseComponent {
  static componentName = 'nt-header';

  static get observedAttributes() {
    return [ 'height' ];
  }

  constructor() {
    super();

    this.adoptStyleSheet( style );

    this.shadowRoot.innerHTML = `<header id="header" part="header"><slot></slot></header>`;
  }

  get height() {
    return this.getAttribute( 'height' );
  }

  set height( value ) {
    this.setAttribute( 'height', value );
  }

  attributeChangedCallback( prop, oldValue, newValue ) {
    if ( oldValue === newValue ) {
      return;
    }
    if ( prop === 'height' ) {
      this.style.setProperty( '--nt-header-height', newValue );
    }
  }
}
