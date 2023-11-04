import BaseComponent from '../base';
import style from './index.css?inline' assert { type: 'css' };
import * as icons from './icons.js';

class NtIcon extends BaseComponent {

  static componentName = 'nt-icon';

  static iconURL = './icons';

  static get observedAttributes() {
    return [ 'size', 'name' ];
  }

  async registerIcons(icons) {
    if (icons) {
      return icons;
    }
    return await import( /* @vite-ignore */ this.constructor.iconURL );
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

    this.adoptStyleSheet(style);
  }

  render() {
    this.registerIcons(icons).then((module) => {
      const icons = module.default;
      const icon = icons.find((icon) => icon.name === this.name);
      const wrapper = document.createElement( 'div' );
      wrapper.innerHTML = icon.icon;
      wrapper.id = 'icon';
      wrapper.setAttribute( 'part', 'icon' );
      this.shadowRoot.appendChild( wrapper );
    });
  }
}

export default NtIcon;
