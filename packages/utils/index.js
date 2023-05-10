export function getComponentName( str ) {
  return str.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase();
}
