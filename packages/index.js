import NtButton from './button';
import NtButtonGroup from './button-group';
import NtHeader from './header';
import NtIcon from './icon';
import NtLoading from './loading';
import NtTable from './table';

const components = [
  NtButton,
  NtButtonGroup,
  NtHeader,
  NtIcon,
  NtLoading,
  NtTable
];

const componentMap = {
  NtButton,
  NtButtonGroup,
  NtHeader,
  NtIcon,
  NtLoading,
  NtTable
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
