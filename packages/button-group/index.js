import BaseComponent from "@packages/base";
import style from './index.css?inline' assert { type: 'css' };

export default class ButtonGroup extends BaseComponent {
  static componentName = 'nt-button-group';

  constructor() {
    super();

    this.shadowRoot.innerHTML = `<slot></slot>`;

    this.adoptStyleSheet( style );
  }
}
