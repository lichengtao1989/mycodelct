export default (routerMap) => {
  const maps = Object.keys(routerMap).map(key => {
    return {path: key, component: routerMap[key]};
  });
  return maps;
}
