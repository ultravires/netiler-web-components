import BaseComponent from '../base';
import style from './index.css?inline' assert { type: 'css' };

class NtIcon extends BaseComponent {

  static componentName = 'nt-icon';

  static iconURL = 'http://localhost:5173/icons/index.js';

  static get observedAttributes() {
    return [ 'size', 'name' ];
  }

  async registerIcons() {
    const icons = await import( /* @vite-ignore */ this.constructor.iconURL );
    return icons;
  }

  get name() {
    return this.getAttribute( 'name' );
  }

  set name( value ) {
    this.setAttribute( 'name', value );
  }

  get size() {
    return this.getAttribute( 'size' );
  }

  set size( value ) {
    this.setAttribute( 'size', value );
  }

  attributeChangedCallback( prop, oldValue, newValue ) {
    if (oldValue === newValue) {
      return;
    }
    if ( prop === 'size' ) {
      this.style.fontSize = `${ newValue }px`;
      return;
    }
    if ( prop === 'name' ) {
      this.render();
    }
  }

  constructor() {
    super();

    this.adoptStyleSheet( style );
  }

  render() {
    this.registerIcons().then( ( module ) => {
      const icons = module.default;
      const icon = icons.find( ( icon ) => icon.name === this.name );
      this.shadowRoot.innerHTML = `
      <svg id="icon" part="icon">
        <symbol viewBox="0 0 1024 1024" id="${ icon.name }">
          ${ icon.path }
        </symbol>
        <use xlink:href="#${ this.name }"></use>
      </svg>
      `;
    } );
  }
}

export default NtIcon;
