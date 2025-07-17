import { jsx } from 'react/jsx-runtime';
import { H as HotRecommendations } from './HotRecommendations-CmaYdK7c.mjs';
import { R as Route$3 } from './ssr.mjs';
import 'react';
import '@tanstack/react-router';
import './separator-B17L11j9.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-separator';
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

const SplitComponent = function Home() {
  const {
    hotScripts
  } = Route$3.useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary", children: /* @__PURE__ */ jsx(HotRecommendations, { scripts: hotScripts }) });
};

export { SplitComponent as component };
//# sourceMappingURL=index-CLAb060b.mjs.map
