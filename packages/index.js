import NtButton from './button';
import NtButtonGroup from './button-group';
import NtHeader from './header';
import NtIcon from './icon';
import NtLoading from './loading';

const components = [
  NtButton,
  NtButtonGroup,
  NtHeader,
  NtIcon,
  NtLoading
];

const componentMap = {
  NtButton,
  NtButtonGroup,
  NtHeader,
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
