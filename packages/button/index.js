import BaseComponent from '../base';
import style from './index.css?inline' assert { type: 'css' };

export default class NtButton extends BaseComponent {
  #button;
  #loading;

  static componentName = 'nt-button';

  static get observedAttributes() {
    return [ 'disabled', 'color', 'loading', 'type' ];
  }

  constructor() {
    super();
    this.adoptStyleSheet( style );
    this.render();
  }

  render() {
    if (this.type === 'link') {
      this.shadowRoot.innerHTML = `<a id="button" part="button"><slot></slot></a>`;
    } else {
      this.shadowRoot.innerHTML = `
      <button id="button" part="button">
        <slot id="loading" name="loading" hidden>
          <nt-loading></nt-loading>
        </slot>
        <slot></slot>
      </button>`;
    }
    this.#button = this.shadowRoot.getElementById('button');
    this.#loading = this.shadowRoot.getElementById('loading');
  }

  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if ( value ) {
      this.setAttribute( 'disabled', '' );
      this.#button.setAttribute( 'disabled', '' );
    } else {
      this.removeAttribute( 'disabled' );
      this.#button.removeAttribute( 'disabled' );
    }
  }

  get color() {
    return this.getAttribute( 'color' );
  }

  set color( value ) {
    this.setAttribute( 'color', value );
  }

  get loading() {
    return this.hasAttribute( 'loading' );
  }

  set loading( value ) {
    if ( value ) {
      this.disabled = true;
      this.#loading.hidden = false;
      this.setAttribute( 'loading', '' );
    } else {
      this.#loading.hidden = true;
      this.disabled = false;
      this.removeAttribute( 'loading' );
    }
  }

  get type() {
    return this.getAttribute( 'type' );
  }

  set type(value) {
    this.setAttribute( 'type', value );
  }

  attributeChangedCallback( prop, oldValue, newValue ) {
    if ( oldValue === newValue ) return;

    if ( prop === 'color' && !['primary', 'success', 'warning', 'danger', 'default'].includes(newValue) ) {
      this.style.setProperty('--nt-button-primary-color', newValue);
      return;
    }

    if ( prop === 'loading' ) {
      this.loading = ( newValue !== null );
      return;
    }

    if ( prop === 'disabled' ) {
      this.disabled = ( newValue !== null );
      return;
    }
  }
}
