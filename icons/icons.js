const modules = import.meta.glob('./**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const icons = [];
for (let path in modules) {
  const name = path.replace(/(\.\/|\.svg)/g, '').replace(/\//g, '-');
  const icon = modules[path];
  icons.push({ name, icon });
}

export default icons;
