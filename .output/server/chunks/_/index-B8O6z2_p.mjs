import { jsx } from 'react/jsx-runtime';
import { createFileRoute } from '@tanstack/react-router';
import { c as createServerRpc, b as createServerFn, g as getHotScripts, m as mockScripts } from './ssr.mjs';
import { H as HotRecommendations } from './HotRecommendations-CmaYdK7c.mjs';
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
import 'react';
import './separator-B17L11j9.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-separator';

const getScriptData_createServerFn_handler = createServerRpc("src_routes_index_tsx--getScriptData_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getScriptData.__executeServer(opts, signal);
});
const getScriptData = createServerFn({
  method: "GET"
}).handler(getScriptData_createServerFn_handler, async () => {
  const hotScripts = getHotScripts(mockScripts).slice(0, 5);
  return {
    hotScripts
  };
});
const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getScriptData()
});
function Home() {
  const {
    hotScripts
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary", children: /* @__PURE__ */ jsx(HotRecommendations, { scripts: hotScripts }) });
}

export { getScriptData_createServerFn_handler };
//# sourceMappingURL=index-B8O6z2_p.mjs.map
