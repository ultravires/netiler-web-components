import BaseComponent from '@packages/base';
import style from './index.css?inline' assert { type: 'css' };

export default class NtButton extends BaseComponent {
  #button;
  #loading;

  static componentName = 'nt-button';

  static get observedAttributes() {
    return [ 'disabled', 'color', 'loading', 'type', 'nativeType' ];
  }

  constructor() {
    super();
    this.adoptStyleSheet( style );
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.type === 'link') {
      this.shadowRoot.innerHTML = `<a class="button" part="button"><slot></slot></a>`;
      setTimeout(() => {
        this.#button = this.shadowRoot.querySelector('.button');
      }, 0);
    } else {
      const nativeType = this.nativeType;
      this.shadowRoot.innerHTML = `
      <button class="button" part="button" type=${nativeType}>
        <slot class="loading" name="loading" ${ this.loading ? '' : 'hidden' }>
          <nt-loading></nt-loading>
        </slot>
        <slot></slot>
      </button>`;
      setTimeout(() => {
        this.#button = this.shadowRoot.querySelector('.button');
        this.#loading = this.shadowRoot.querySelector('.loading');
      }, 0);
    }
  }

  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if ( value ) {
      this.#button?.setAttribute( 'disabled', '' );
      this.#button?.setAttribute( 'disabled', '' );
    } else {
      this.#button?.removeAttribute( 'disabled' );
      this.#button?.removeAttribute( 'disabled' );
    }
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    if (value) {
      this.disabled = true;
      this.#loading && (this.#loading.hidden = false);
      this.setAttribute( 'loading', '' );
    } else {
      this.#loading && (this.#loading.hidden = true);
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

  get nativeType() {
    return this.getAttribute('native-type') || 'default';
  }

  set nativeType(value) {
    this.setAttribute('native-Type', value);
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
