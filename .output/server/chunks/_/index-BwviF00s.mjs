import { c as createServerRpc, b as createServerFn } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'clsx';
import 'tailwind-merge';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const getServerTime_createServerFn_handler = createServerRpc("src_routes_about_index_tsx--getServerTime_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getServerTime.__executeServer(opts, signal);
});
const getServerTime = createServerFn().handler(getServerTime_createServerFn_handler, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  return (/* @__PURE__ */ new Date()).toISOString();
});

export { getServerTime_createServerFn_handler };
//# sourceMappingURL=index-BwviF00s.mjs.map
