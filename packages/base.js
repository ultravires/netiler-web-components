export default class BaseComponent extends HTMLElement {
  static define(componentName = this.componentName, options = {}) {
    if ( !window.customElements.get( componentName ) ) {
      window.customElements.define( componentName, this );
    }
  }

  adoptStyleSheet( style, dom = this.shadowRoot) {
    const cssStyleSheet = new CSSStyleSheet();
    cssStyleSheet.replace( style );
    dom.adoptedStyleSheets = [ ...dom.adoptedStyleSheets, cssStyleSheet ];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    // TODO
  }

  connectedCallback() {
    // TODO
  }

  disconnectedCallback() {
    // TODO
  }

  adoptedCallback() {
    // TODO
  }

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.attachShadow( { mode: 'open' } );
  }
}
