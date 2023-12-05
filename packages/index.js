import NtButton from './button';
import NtButtonGroup from './button-group';
import NtHeader from './header';
import NtIcon from './icon';
import NtLoading from './loading';
import NtMarquee from './marquee';
import NtPdfViewer from './pdfviewer';
import NtTable from './table';

const components = [
  NtButton,
  NtButtonGroup,
  NtHeader,
  NtIcon,
  NtLoading,
  NtMarquee,
  NtPdfViewer,
  NtTable
];

const componentMap = {
  NtButton,
  NtButtonGroup,
  NtHeader,
  NtIcon,
  NtLoading,
  NtMarquee,
  NtPdfViewer,
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
