import { jsx, jsxs } from 'react/jsx-runtime';

const SplitErrorComponent = ({
  error
}) => {
  return /* @__PURE__ */ jsx("div", { className: "error-page", children: /* @__PURE__ */ jsxs("div", { className: "error-content", children: [
    /* @__PURE__ */ jsx("h1", { children: "\u5287\u672C\u672A\u627E\u5230" }),
    /* @__PURE__ */ jsx("p", { children: "\u62B1\u6B49\uFF0C\u60A8\u8981\u67E5\u770B\u7684\u5287\u672C\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u522A\u9664\u3002" }),
    /* @__PURE__ */ jsx("p", { className: "error-message", children: error.message }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "back-home-btn", children: "\u8FD4\u56DE\u9996\u9801" })
  ] }) });
};

export { SplitErrorComponent as errorComponent };
//# sourceMappingURL=_id-DS6E2gNL.mjs.map
