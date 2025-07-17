import { jsx, jsxs } from 'react/jsx-runtime';
import { c as createServerRpc, b as createServerFn, g as getHotScripts, m as mockScripts, H as Header, F as Footer } from './ssr.mjs';
import { createRootRoute, useRouter, Outlet, HeadContent, Scripts } from '@tanstack/react-router';
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

const getGlobalData_createServerFn_handler = createServerRpc("src_routes_root_tsx--getGlobalData_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getGlobalData.__executeServer(opts, signal);
});
const getGlobalData = createServerFn({
  method: "GET"
}).handler(getGlobalData_createServerFn_handler, async () => {
  const hotScripts = getHotScripts(mockScripts).slice(0, 5);
  return {
    totalScripts: mockScripts.length,
    hotScripts: hotScripts.length
  };
});
function RootComponent() {
  const {
    totalScripts,
    hotScripts
  } = Route.useLoaderData();
  const router = useRouter();
  const isHomePage = router.state.location.pathname === "/";
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, { showStats: isHomePage, totalScripts, hotScripts }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
const Route = createRootRoute({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "PlayHard \u5287\u672C\u6BBA"
    }]
  }),
  loader: async () => await getGlobalData(),
  component: RootComponent,
  notFoundComponent: () => {
    return /* @__PURE__ */ jsx("div", { className: "not-found-page", children: /* @__PURE__ */ jsxs("div", { className: "not-found-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "404" }),
      /* @__PURE__ */ jsx("h2", { children: "\u9801\u9762\u672A\u627E\u5230" }),
      /* @__PURE__ */ jsx("p", { children: "\u62B1\u6B49\uFF0C\u60A8\u8A2A\u554F\u7684\u9801\u9762\u4E0D\u5B58\u5728\u3002" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "back-home-btn", children: "\u8FD4\u56DE\u9996\u9801" })
    ] }) });
  }
});
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx("title", { children: "PlayHard \u5287\u672C\u6BBA" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}

export { getGlobalData_createServerFn_handler };
//# sourceMappingURL=__root-B0TmVZxF.mjs.map
