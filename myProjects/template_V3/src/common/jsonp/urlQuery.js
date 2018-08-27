export default function (url = window.location.href) {
  const query = {};
  const search = (url.split('?')[1] || '').split('#')[0];
  const kvs = search.split('&');
  kvs.forEach(kv => {
    const key = kv.split('=')[0];
    const value = decodeURIComponent(kv.split('=')[1]);
    query[key] = value;
  });
  return query;
}