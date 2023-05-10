import NtButton from './button';
import NtButtonGroup from './button-group';
import NtIcon from './icon';
import NtLoading from './loading';

const components = [
  NtButton,
  NtButtonGroup,
  NtIcon,
  NtLoading
];

const componentMap = {
  NtButton,
  NtButtonGroup,
  NtIcon,
  NtLoading
};

export default {
  define( options ) {
    let len = components.length;
    while ( len ) {
      const component = components[len - 1];
      component.define( options );
      len -= 1;
    }
  },
  getComponent( componentName ) {
    return componentMap[componentName];
  }
}
