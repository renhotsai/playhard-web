import { createFileRoute, Link, lazyRouteComponent, createRootRoute, useRouter, Outlet, HeadContent, Scripts, RouterProvider, createRouter as createRouter$1 } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { isRedirect, isNotFound, joinPaths, trimPath, processRouteTree, isResolvedRedirect, rootRouteId, getMatchedRoutes } from '@tanstack/router-core';
import { tsrSerializer, mergeHeaders, json } from '@tanstack/router-core/ssr/client';
import { createMemoryHistory } from '@tanstack/history';
import { attachRouterServerSsrUtils, dehydrateRouter } from '@tanstack/router-core/ssr/server';
import { AsyncLocalStorage } from 'node:async_hooks';
import { defineHandlerCallback, renderRouterToStream } from '@tanstack/react-router/ssr/server';

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function getResponseStatus$1(event) {
  return event.node.res.statusCode;
}
function getResponseHeaders$1(event) {
  return event.node.res.getHeaders();
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
const defaultStreamHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) => renderRouterToStream({
    request,
    router,
    responseHeaders,
    children: /* @__PURE__ */ jsx(StartServer, { router })
  })
);
const globalMiddleware = [];
function createServerFn(options, __opts) {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") {
    resolvedOptions.method = "GET";
  }
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        middleware
      }));
    },
    validator: (validator) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        validator
      }));
    },
    type: (type) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        type
      }));
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      Object.assign(resolvedOptions, {
        ...extractedFn,
        extractedFn,
        serverFn
      });
      const resolvedMiddleware = [...resolvedOptions.middleware || [], serverFnBaseToMiddleware(resolvedOptions)];
      return Object.assign(async (opts) => {
        return executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...resolvedOptions,
          data: opts == null ? void 0 : opts.data,
          headers: opts == null ? void 0 : opts.headers,
          signal: opts == null ? void 0 : opts.signal,
          context: {}
        }).then((d) => {
          if (resolvedOptions.response === "full") {
            return d;
          }
          if (d.error) throw d.error;
          return d.result;
        });
      }, {
        // This copies over the URL, function ID
        ...extractedFn,
        // The extracted function on the server-side calls
        // this function
        __executeServer: async (opts_, signal) => {
          const opts = opts_ instanceof FormData ? extractFormDataContext(opts_) : opts_;
          opts.type = typeof resolvedOptions.type === "function" ? resolvedOptions.type(opts) : resolvedOptions.type;
          const ctx = {
            ...extractedFn,
            ...opts,
            signal
          };
          const run = () => executeMiddleware$1(resolvedMiddleware, "server", ctx).then((d) => ({
            // Only send the result and sendContext back to the client
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
          if (ctx.type === "static") {
            let response;
            if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.getItem) {
              response = await serverFnStaticCache.getItem(ctx);
            }
            if (!response) {
              response = await run().then((d) => {
                return {
                  ctx: d,
                  error: null
                };
              }).catch((e) => {
                return {
                  ctx: void 0,
                  error: e
                };
              });
              if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.setItem) {
                await serverFnStaticCache.setItem(ctx, response);
              }
            }
            invariant(response, "No response from both server and static cache!");
            if (response.error) {
              throw response.error;
            }
            return response.ctx;
          }
          return run();
        }
      });
    }
  };
}
async function executeMiddleware$1(middlewares, env, opts) {
  const flattenedMiddlewares = flattenMiddlewares([...globalMiddleware, ...middlewares]);
  const next = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) {
      return ctx;
    }
    if (nextMiddleware.options.validator && (env === "client" ? nextMiddleware.options.validateClient : true)) {
      ctx.data = await execValidator(nextMiddleware.options.validator, ctx.data);
    }
    const middlewareFn = env === "client" ? nextMiddleware.options.client : nextMiddleware.options.server;
    if (middlewareFn) {
      return applyMiddleware(middlewareFn, ctx, async (newCtx) => {
        return next(newCtx).catch((error) => {
          if (isRedirect(error) || isNotFound(error)) {
            return {
              ...newCtx,
              error
            };
          }
          throw error;
        });
      });
    }
    return next(ctx);
  };
  return next({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || {}
  });
}
let serverFnStaticCache;
function setServerFnStaticCache(cache) {
  const previousCache = serverFnStaticCache;
  serverFnStaticCache = typeof cache === "function" ? cache() : cache;
  return () => {
    serverFnStaticCache = previousCache;
  };
}
function createServerFnStaticCache(serverFnStaticCache2) {
  return serverFnStaticCache2;
}
async function sha1Hash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
setServerFnStaticCache(() => {
  const getStaticCacheUrl = async (options, hash) => {
    const filename = await sha1Hash(`${options.functionId}__${hash}`);
    return `/__tsr/staticServerFnCache/${filename}.json`;
  };
  const jsonToFilenameSafeString = (json2) => {
    const sortedKeysReplacer = (key, value) => value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort().reduce((acc, curr) => {
      acc[curr] = value[curr];
      return acc;
    }, {}) : value;
    const jsonString = JSON.stringify(json2 ?? "", sortedKeysReplacer);
    return jsonString.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "_");
  };
  const staticClientCache = typeof document !== "undefined" ? /* @__PURE__ */ new Map() : null;
  return createServerFnStaticCache({
    getItem: async (ctx) => {
      if (typeof document === "undefined") {
        const hash = jsonToFilenameSafeString(ctx.data);
        const url = await getStaticCacheUrl(ctx, hash);
        const publicUrl = "/Users/renhotsai/Desktop/playhard-web/.output/public";
        const {
          promises: fs
        } = await import('node:fs');
        const path = await import('node:path');
        const filePath = path.join(publicUrl, url);
        const [cachedResult, readError] = await fs.readFile(filePath, "utf-8").then((c) => [tsrSerializer.parse(c), null]).catch((e) => [null, e]);
        if (readError && readError.code !== "ENOENT") {
          throw readError;
        }
        return cachedResult;
      }
      return void 0;
    },
    setItem: async (ctx, response) => {
      const {
        promises: fs
      } = await import('node:fs');
      const path = await import('node:path');
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      const publicUrl = "/Users/renhotsai/Desktop/playhard-web/.output/public";
      const filePath = path.join(publicUrl, url);
      await fs.mkdir(path.dirname(filePath), {
        recursive: true
      });
      await fs.writeFile(filePath, tsrSerializer.stringify(response));
    },
    fetchItem: async (ctx) => {
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      let result = staticClientCache == null ? void 0 : staticClientCache.get(url);
      if (!result) {
        result = await fetch(url, {
          method: "GET"
        }).then((r) => r.text()).then((d) => tsrSerializer.parse(d));
        staticClientCache == null ? void 0 : staticClientCache.set(url, result);
      }
      return result;
    }
  });
});
function extractFormDataContext(formData) {
  const serializedContext = formData.get("__TSR_CONTEXT");
  formData.delete("__TSR_CONTEXT");
  if (typeof serializedContext !== "string") {
    return {
      context: {},
      data: formData
    };
  }
  try {
    const context = tsrSerializer.parse(serializedContext);
    return {
      context,
      data: formData
    };
  } catch {
    return {
      data: formData
    };
  }
}
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m) => {
      if (m.options.middleware) {
        recurse(m.options.middleware);
      }
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
const applyMiddleware = async (middlewareFn, ctx, nextFn) => {
  return middlewareFn({
    ...ctx,
    next: async (userCtx = {}) => {
      return nextFn({
        ...ctx,
        ...userCtx,
        context: {
          ...ctx.context,
          ...userCtx.context
        },
        sendContext: {
          ...ctx.sendContext,
          ...userCtx.sendContext ?? {}
        },
        headers: mergeHeaders(ctx.headers, userCtx.headers),
        result: userCtx.result !== void 0 ? userCtx.result : ctx.response === "raw" ? userCtx : ctx.result,
        error: userCtx.error ?? ctx.error
      });
    }
  });
};
function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = validator["~standard"].validate(input);
    if (result instanceof Promise) throw new Error("Async validation not supported");
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) {
    return validator.parse(input);
  }
  if (typeof validator === "function") {
    return validator(input);
  }
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    _types: void 0,
    options: {
      validator: options.validator,
      validateClient: options.validateClient,
      client: async ({
        next,
        sendContext,
        ...ctx
      }) => {
        var _a;
        const payload = {
          ...ctx,
          // switch the sendContext over to context
          context: sendContext,
          type: typeof ctx.type === "function" ? ctx.type(ctx) : ctx.type
        };
        if (ctx.type === "static" && "production" === "production" && typeof document !== "undefined") {
          invariant(serverFnStaticCache, "serverFnStaticCache.fetchItem is not available!");
          const result = await serverFnStaticCache.fetchItem(payload);
          if (result) {
            if (result.error) {
              throw result.error;
            }
            return next(result.ctx);
          }
          warning(result, `No static cache item found for ${payload.functionId}__${JSON.stringify(payload.data)}, falling back to server function...`);
        }
        const res = await ((_a = options.extractedFn) == null ? void 0 : _a.call(options, payload));
        return next(res);
      },
      server: async ({
        next,
        ...ctx
      }) => {
        var _a;
        const result = await ((_a = options.serverFn) == null ? void 0 : _a.call(options, ctx));
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
const eventStorage = new AsyncLocalStorage();
function defineEventHandler(handler) {
  return defineEventHandler$1((event) => {
    return runWithEvent(event, () => handler(event));
  });
}
async function runWithEvent(event, fn) {
  return eventStorage.run(event, fn);
}
function getEvent() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return event;
}
const HTTPEventSymbol = Symbol("$HTTPEvent");
function isEvent(obj) {
  return typeof obj === "object" && (obj instanceof H3Event || (obj == null ? void 0 : obj[HTTPEventSymbol]) instanceof H3Event || (obj == null ? void 0 : obj.__is_event__) === true);
}
function createWrapperFunction(h3Function) {
  return function(...args) {
    const event = args[0];
    if (!isEvent(event)) {
      args.unshift(getEvent());
    } else {
      args[0] = event instanceof H3Event || event.__is_event__ ? event : event[HTTPEventSymbol];
    }
    return h3Function(...args);
  };
}
const getResponseStatus = createWrapperFunction(getResponseStatus$1);
const getResponseHeaders = createWrapperFunction(getResponseHeaders$1);
function requestHandler(handler) {
  return handler;
}
const VIRTUAL_MODULES = {
  routeTree: "tanstack-start-route-tree:v",
  startManifest: "tanstack-start-manifest:v",
  serverFnManifest: "tanstack-start-server-fn-manifest:v"
};
async function loadVirtualModule(id) {
  switch (id) {
    case VIRTUAL_MODULES.routeTree:
      return await Promise.resolve().then(() => routeTree_gen);
    case VIRTUAL_MODULES.startManifest:
      return await import('./_tanstack-start-manifest_v-D1UcJfq3.mjs');
    case VIRTUAL_MODULES.serverFnManifest:
      return await import('./_tanstack-start-server-fn-manifest_v-CgEu5HM7.mjs');
    default:
      throw new Error(`Unknown virtual module: ${id}`);
  }
}
async function getStartManifest(opts) {
  const { tsrStartManifest } = await loadVirtualModule(
    VIRTUAL_MODULES.startManifest
  );
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let script = `import('${startManifest.clientEntry}')`;
  rootRoute.assets.push({
    tag: "script",
    attrs: {
      type: "module",
      suppressHydrationWarning: true,
      async: true
    },
    children: script
  });
  const manifest = {
    ...startManifest,
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).map(([k, v]) => {
        const { preloads, assets } = v;
        return [
          k,
          {
            preloads,
            assets
          }
        ];
      })
    )
  };
  return manifest;
}
function sanitizeBase$1(base) {
  return base.replace(/^\/|\/$/g, "");
}
const handleServerAction = async ({
  request
}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort);
  const method = request.method;
  const url = new URL(request.url, "http://localhost:3000");
  const regex = new RegExp(`${sanitizeBase$1("/_serverFn")}/([^/?#]+)`);
  const match = url.pathname.match(regex);
  const serverFnId = match ? match[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = "createServerFn" in search;
  const isRaw = "raw" in search;
  if (typeof serverFnId !== "string") {
    throw new Error("Invalid server action param for serverFnId: " + serverFnId);
  }
  const {
    default: serverFnManifest
  } = await loadVirtualModule(VIRTUAL_MODULES.serverFnManifest);
  const serverFnInfo = serverFnManifest[serverFnId];
  if (!serverFnInfo) {
    console.info("serverFnManifest", serverFnManifest);
    throw new Error("Server function info not found for " + serverFnId);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + serverFnId);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(`Server function module export not resolved for serverFn ID: ${serverFnId}`);
  }
  const formDataContentTypes = ["multipart/form-data", "application/x-www-form-urlencoded"];
  const response = await (async () => {
    try {
      let result = await (async () => {
        if (request.headers.get("Content-Type") && formDataContentTypes.some((type) => {
          var _a;
          return (_a = request.headers.get("Content-Type")) == null ? void 0 : _a.includes(type);
        })) {
          invariant(method.toLowerCase() !== "get", "GET requests with FormData payloads are not supported");
          return await action(await request.formData(), signal);
        }
        if (method.toLowerCase() === "get") {
          let payload2 = search;
          if (isCreateServerFn) {
            payload2 = search.payload;
          }
          payload2 = payload2 ? tsrSerializer.parse(payload2) : payload2;
          return await action(payload2, signal);
        }
        const jsonPayloadAsString = await request.text();
        const payload = tsrSerializer.parse(jsonPayloadAsString);
        if (isCreateServerFn) {
          return await action(payload, signal);
        }
        return await action(...payload, signal);
      })();
      if (result.result instanceof Response) {
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      return new Response(result !== void 0 ? tsrSerializer.stringify(result) : void 0, {
        status: getResponseStatus(getEvent()),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      return new Response(tsrSerializer.stringify(error), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  })();
  request.signal.removeEventListener("abort", abort);
  if (isRaw) {
    return response;
  }
  return response;
};
function isNotFoundResponse(error) {
  const {
    headers,
    ...rest
  } = error;
  return new Response(JSON.stringify(rest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
function getStartResponseHeaders(opts) {
  const headers = mergeHeaders(
    getResponseHeaders(),
    {
      "Content-Type": "text/html; charset=UTF-8"
    },
    ...opts.router.state.matches.map((match) => {
      return match.headers;
    })
  );
  return headers;
}
function createStartHandler({
  createRouter: createRouter2
}) {
  let routeTreeModule = null;
  let startRoutesManifest = null;
  let processedServerRouteTree = void 0;
  return (cb) => {
    const originalFetch = globalThis.fetch;
    const startRequestResolver = async ({ request }) => {
      globalThis.fetch = async function(input, init) {
        function resolve(url2, requestOptions) {
          const fetchRequest = new Request(url2, requestOptions);
          return startRequestResolver({ request: fetchRequest });
        }
        function getOrigin() {
          return request.headers.get("Origin") || request.headers.get("Referer") || "http://localhost";
        }
        if (typeof input === "string" && input.startsWith("/")) {
          const url2 = new URL(input, getOrigin());
          return resolve(url2, init);
        } else if (typeof input === "object" && "url" in input && typeof input.url === "string" && input.url.startsWith("/")) {
          const url2 = new URL(input.url, getOrigin());
          return resolve(url2, init);
        }
        return originalFetch(input, init);
      };
      const url = new URL(request.url);
      const href = url.href.replace(url.origin, "");
      const APP_BASE = "/";
      const router = createRouter2();
      const history = createMemoryHistory({
        initialEntries: [href]
      });
      router.update({
        history
      });
      const response = await (async () => {
        try {
          if (false) ;
          const serverFnBase = joinPaths([
            APP_BASE,
            trimPath("/_serverFn"),
            "/"
          ]);
          if (href.startsWith(serverFnBase)) {
            return await handleServerAction({ request });
          }
          if (routeTreeModule === null) {
            try {
              routeTreeModule = await loadVirtualModule(
                VIRTUAL_MODULES.routeTree
              );
              if (routeTreeModule.serverRouteTree) {
                processedServerRouteTree = processRouteTree({
                  routeTree: routeTreeModule.serverRouteTree,
                  initRoute: (route, i) => {
                    route.init({
                      originalIndex: i
                    });
                  }
                });
              }
            } catch (e) {
              console.log(e);
            }
          }
          async function executeRouter() {
            const requestAcceptHeader = request.headers.get("Accept") || "*/*";
            const splitRequestAcceptHeader = requestAcceptHeader.split(",");
            const supportedMimeTypes = ["*/*", "text/html"];
            const isRouterAcceptSupported = supportedMimeTypes.some(
              (mimeType) => splitRequestAcceptHeader.some(
                (acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)
              )
            );
            if (!isRouterAcceptSupported) {
              return json(
                {
                  error: "Only HTML requests are supported here"
                },
                {
                  status: 500
                }
              );
            }
            if (startRoutesManifest === null) {
              startRoutesManifest = await getStartManifest({
                basePath: APP_BASE
              });
            }
            attachRouterServerSsrUtils(router, startRoutesManifest);
            await router.load();
            if (router.state.redirect) {
              return router.state.redirect;
            }
            dehydrateRouter(router);
            const responseHeaders = getStartResponseHeaders({ router });
            const response2 = await cb({
              request,
              router,
              responseHeaders
            });
            return response2;
          }
          if (processedServerRouteTree) {
            const [_matchedRoutes, response2] = await handleServerRoutes({
              processedServerRouteTree,
              router,
              request,
              basePath: APP_BASE,
              executeRouter
            });
            if (response2) return response2;
          }
          const routerResponse = await executeRouter();
          return routerResponse;
        } catch (err) {
          if (err instanceof Response) {
            return err;
          }
          throw err;
        }
      })();
      if (isRedirect(response)) {
        if (isResolvedRedirect(response)) {
          if (request.headers.get("x-tsr-redirect") === "manual") {
            return json(
              {
                ...response.options,
                isSerializedRedirect: true
              },
              {
                headers: response.headers
              }
            );
          }
          return response;
        }
        if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) {
          throw new Error(
            `Server side redirects must use absolute paths via the 'href' or 'to' options. Received: ${JSON.stringify(response.options)}`
          );
        }
        if (["params", "search", "hash"].some(
          (d) => typeof response.options[d] === "function"
        )) {
          throw new Error(
            `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
              response.options
            ).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`
          );
        }
        const redirect = router.resolveRedirect(response);
        if (request.headers.get("x-tsr-redirect") === "manual") {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true
            },
            {
              headers: response.headers
            }
          );
        }
        return redirect;
      }
      return response;
    };
    return requestHandler(startRequestResolver);
  };
}
async function handleServerRoutes(opts) {
  var _a, _b;
  const url = new URL(opts.request.url);
  const pathname = url.pathname;
  const serverTreeResult = getMatchedRoutes({
    pathname,
    basepath: opts.basePath,
    caseSensitive: true,
    routesByPath: opts.processedServerRouteTree.routesByPath,
    routesById: opts.processedServerRouteTree.routesById,
    flatRoutes: opts.processedServerRouteTree.flatRoutes
  });
  const routeTreeResult = opts.router.getMatchedRoutes(pathname, void 0);
  let response;
  let matchedRoutes = [];
  matchedRoutes = serverTreeResult.matchedRoutes;
  if (routeTreeResult.foundRoute) {
    if (serverTreeResult.matchedRoutes.length < routeTreeResult.matchedRoutes.length) {
      const closestCommon = [...routeTreeResult.matchedRoutes].reverse().find((r) => {
        return opts.processedServerRouteTree.routesById[r.id] !== void 0;
      });
      if (closestCommon) {
        let routeId = closestCommon.id;
        matchedRoutes = [];
        do {
          const route = opts.processedServerRouteTree.routesById[routeId];
          if (!route) {
            break;
          }
          matchedRoutes.push(route);
          routeId = (_a = route.parentRoute) == null ? void 0 : _a.id;
        } while (routeId);
        matchedRoutes.reverse();
      }
    }
  }
  if (matchedRoutes.length) {
    const middlewares = flattenMiddlewares(
      matchedRoutes.flatMap((r) => r.options.middleware).filter(Boolean)
    ).map((d) => d.options.server);
    if ((_b = serverTreeResult.foundRoute) == null ? void 0 : _b.options.methods) {
      const method = Object.keys(
        serverTreeResult.foundRoute.options.methods
      ).find(
        (method2) => method2.toLowerCase() === opts.request.method.toLowerCase()
      );
      if (method) {
        const handler = serverTreeResult.foundRoute.options.methods[method];
        if (handler) {
          if (typeof handler === "function") {
            middlewares.push(handlerToMiddleware(handler));
          } else {
            if (handler._options.middlewares && handler._options.middlewares.length) {
              middlewares.push(
                ...flattenMiddlewares(handler._options.middlewares).map(
                  (d) => d.options.server
                )
              );
            }
            if (handler._options.handler) {
              middlewares.push(handlerToMiddleware(handler._options.handler));
            }
          }
        }
      }
    }
    middlewares.push(handlerToMiddleware(opts.executeRouter));
    const ctx = await executeMiddleware(middlewares, {
      request: opts.request,
      context: {},
      params: serverTreeResult.routeParams,
      pathname
    });
    response = ctx.response;
  }
  return [matchedRoutes, response];
}
function handlerToMiddleware(handler) {
  return async ({ next: _next, ...rest }) => {
    const response = await handler(rest);
    if (response) {
      return { response };
    }
    return _next(rest);
  };
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    const result = await middleware({
      ...ctx2,
      // Allow the middleware to call the next middleware in the chain
      next: async (nextCtx) => {
        const nextResult = await next({ ...ctx2, ...nextCtx });
        return Object.assign(ctx2, handleCtxResult(nextResult));
      }
      // Allow the middleware result to extend the return context
    }).catch((err) => {
      if (isSpecialResponse(err)) {
        return {
          response: err
        };
      }
      throw err;
    });
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
function sanitizeBase(base) {
  return base.replace(/^\/|\/$/g, "");
}
const createServerRpc = (functionId, serverBase, splitImportFn) => {
  invariant(
    splitImportFn,
    "🚨splitImportFn required for the server functions server runtime, but was not provided."
  );
  const url = `/${sanitizeBase(serverBase)}/${functionId}`;
  return Object.assign(splitImportFn, {
    url,
    functionId
  });
};
const mockScripts = [
  {
    id: "1",
    title: "血色婚禮",
    description: "一場盛大的婚禮變成了血腥的謀殺現場，賓客們都是嫌疑人。在這個充滿愛恨情仇的故事中，每個人都有不可告人的秘密。",
    coverImage: "/images/scripts/bloody-wedding.jpg",
    author: "神秘作家",
    playerCount: { min: 6, max: 8 },
    duration: 240,
    difficulty: "hard",
    category: "mystery",
    tags: ["謀殺", "婚禮", "復仇", "愛情"],
    rating: 4.8,
    totalRatings: 156,
    favoriteCount: 89,
    playCount: 342,
    releaseDate: "2024-06-15",
    updatedAt: "2024-06-20",
    isNew: true,
    isHot: true,
    fullDescription: "在一個風景如畫的莊園裡，一場豪華婚禮正在舉行。新郎新娘站在祭壇前，親朋好友齊聚一堂，一切看起來都那麼完美。然而，當婚禮進行到交換戒指的環節時，突然燈光熄滅，一聲慘叫劃破夜空。當燈光重新亮起時，新郎倒在血泊中，生死不明。所有的賓客都成了嫌疑人，每個人都有自己的動機和秘密。愛情、金錢、權力、復仇交織在一起，真相隱藏在層層謊言之下。",
    storyBackground: "故事發生在20世紀30年代的英國鄉村莊園。這是一個充滿階級矛盾的時代，貴族與平民、富人與窮人之間的鴻溝巨大。新郎來自沒落貴族家庭，新娘則是新興資本家的女兒。這場婚禮表面上是愛情的結合，實際上卻是兩個家族利益的交換。",
    gameRules: [
      "每位玩家扮演一個角色，擁有獨特的身份、背景和秘密",
      "通過與其他角色互動，收集線索和信息",
      "可以進行自由討論，但不能直接公開自己的秘密",
      "最終進行投票，指出真正的兇手",
      "兇手如果成功隱瞞身份至最後，則獲勝"
    ],
    characters: [
      {
        name: "新娘艾琳娜",
        description: "美麗優雅的新娘，來自富商家庭",
        background: "資本家的獨生女，從小被寵愛，但內心孤獨",
        relationship: ["與新郎是政治婚姻", "與管家有特殊關係"],
        secrets: ["並不愛新郎", "懷有他人的孩子"],
        goals: ["保護自己的秘密", "找出真兇"]
      },
      {
        name: "新郎的兄弟威廉",
        description: "英俊但沉默寡言的年輕男子",
        background: "家族的二兒子，一直活在哥哥的陰影下",
        relationship: ["嫉妒哥哥的成功", "暗戀新娘"],
        secrets: ["債台高築", "與地下組織有聯繫"],
        goals: ["得到家族遺產", "贏得艾琳娜的心"]
      },
      {
        name: "老管家詹姆斯",
        description: "忠心耿耿的老僕人，在家族服務了30年",
        background: "見證了家族的興衰，知道許多秘密",
        relationship: ["對家族忠誠", "與艾琳娜關係密切"],
        secrets: ["知道新郎的醜聞", "私藏了重要文件"],
        goals: ["保護家族名譽", "確保艾琳娜的安全"]
      }
    ],
    requirements: [
      "需要6-8名玩家參與",
      "遊戲時間約4小時",
      "需要有經驗的主持人引導",
      "建議在安靜的室內環境進行"
    ],
    tips: [
      "仔細閱讀角色卡片，理解角色的動機",
      "主動與其他角色交流，但要小心透露信息",
      "觀察其他玩家的言行，尋找破綻",
      "記住你的目標，但也要靈活應變"
    ],
    images: [
      "/images/scripts/bloody-wedding-1.jpg",
      "/images/scripts/bloody-wedding-2.jpg",
      "/images/scripts/bloody-wedding-3.jpg"
    ],
    features: [
      "複雜的人物關係網",
      "多重反轉的劇情",
      "濃厚的推理氛圍",
      "精美的道具和場景設計"
    ]
  },
  {
    id: "2",
    title: "古宅驚魂",
    description: "一群朋友被困在一座古老的宅邸中，詭異的事件接連發生。誰是真正的兇手？誰能活到最後？",
    coverImage: "/images/scripts/haunted-mansion.jpg",
    author: "恐怖大師",
    playerCount: { min: 4, max: 6 },
    duration: 180,
    difficulty: "medium",
    category: "horror",
    tags: ["鬼屋", "靈異", "恐怖", "古宅"],
    rating: 4.5,
    totalRatings: 203,
    favoriteCount: 145,
    playCount: 567,
    releaseDate: "2024-05-20",
    updatedAt: "2024-05-25",
    isNew: false,
    isHot: true,
    fullDescription: "一座被詛咒的古宅，隱藏著百年前的血腥秘密。六個年輕人因為暴風雨被困在這裡，卻發現這不是巧合。隨著夜晚的到來，詭異的事件開始發生：門會自己開關，走廊裡傳來腳步聲，鏡子裡出現陌生的身影。更可怕的是，他們發現有人開始神秘失蹤。這是超自然現象，還是有人在暗中操控一切？",
    storyBackground: "這座維多利亞時代的古宅曾經是一個富有家族的居所，但在百年前發生了一場慘劇。整個家族在一夜之間離奇死亡，從此這裡就被認為是被詛咒的地方。多年來，有許多人聲稱在這裡看到了鬼魂，聽到了哭泣聲。現在，這群年輕人將親身體驗這個恐怖傳說。",
    gameRules: [
      "玩家需要探索古宅的各個房間，尋找線索",
      "某些房間可能觸發特殊事件",
      "玩家之間可以組隊或單獨行動",
      "每輪結束後可能有角色會遭遇危險",
      "存活到最後並揭開真相的玩家獲勝"
    ],
    characters: [
      {
        name: "心理學家艾米",
        description: "理性冷靜的心理學博士生",
        background: "專攻異常心理學，不相信超自然現象",
        relationship: ["與大衛是情侶", "與莎拉是室友"],
        secrets: ["正在進行秘密實驗", "有精神病史"],
        goals: ["用科學解釋所有現象", "保護自己和大衛"]
      },
      {
        name: "攝影師大衛",
        description: "喜歡冒險的自由攝影師",
        background: "專門拍攝靈異題材，膽子很大",
        relationship: ["艾米的男友", "曾經來過這座宅子"],
        secrets: ["隱瞞了上次來訪的真實目的", "欠了一筆債"],
        goals: ["拍到真正的靈異照片", "找到寶藏線索"]
      }
    ],
    requirements: [
      "需要4-6名玩家參與",
      "遊戲時間約3小時",
      "建議在燈光昏暗的環境中進行",
      "準備一些音效道具會更有氣氛"
    ],
    tips: [
      "保持冷靜，不要被恐怖氣氛影響判斷",
      "仔細觀察環境描述中的細節",
      "與其他角色合作，但要提防背叛",
      "記住，真相往往比表面看起來更複雜"
    ],
    images: [
      "/images/scripts/haunted-mansion-1.jpg",
      "/images/scripts/haunted-mansion-2.jpg"
    ],
    features: [
      "沉浸式恐怖體驗",
      "多重結局設計",
      "心理懸疑與超自然元素結合",
      "精心設計的恐怖氛圍"
    ]
  },
  {
    id: "3",
    title: "時光倒流",
    description: "在一個神秘的小鎮上，時間似乎停止了。玩家們必須解開時空的謎題，才能回到現實世界。",
    coverImage: "/images/scripts/time-loop.jpg",
    author: "科幻作者",
    playerCount: { min: 5, max: 7 },
    duration: 200,
    difficulty: "expert",
    category: "fantasy",
    tags: ["時空", "科幻", "謎題", "小鎮"],
    rating: 4.9,
    totalRatings: 98,
    favoriteCount: 76,
    playCount: 189,
    releaseDate: "2024-07-01",
    updatedAt: "2024-07-01",
    isNew: true,
    isHot: false,
    fullDescription: "一個充滿科幻色彩的時空冒險故事，玩家需要在循環的時間中找到脫離的方法。",
    storyBackground: "在一個偏遠的小鎮上，時間出現了異常，所有人都被困在時間循環中。",
    gameRules: ["探索小鎮尋找線索", "與NPC互動獲取信息", "解開時空謎題", "團隊合作找到出路"],
    characters: [
      {
        name: "物理學家博士",
        description: "研究時空理論的科學家",
        background: "對時間有深入研究",
        relationship: ["與實驗室有關"],
        secrets: ["知道時間異常的原因"],
        goals: ["修復時空裂縫"]
      }
    ],
    requirements: ["5-7名玩家", "需要邏輯思維", "約3.5小時"],
    tips: ["注意時間線索", "團隊討論很重要"],
    images: ["/images/scripts/time-loop-1.jpg"],
    features: ["燒腦解謎", "科幻元素", "團隊合作"]
  },
  {
    id: "4",
    title: "校園霸凌",
    description: "一個關於校園霸凌的沉重故事，每個角色都有自己的困境和選擇。探討人性的光明與黑暗。",
    coverImage: "/images/scripts/school-bullying.jpg",
    author: "社會觀察者",
    playerCount: { min: 6, max: 8 },
    duration: 150,
    difficulty: "medium",
    category: "emotion",
    tags: ["校園", "霸凌", "青春", "成長"],
    rating: 4.3,
    totalRatings: 127,
    favoriteCount: 62,
    playCount: 234,
    releaseDate: "2024-04-10",
    updatedAt: "2024-04-15",
    isNew: false,
    isHot: true,
    fullDescription: "一個深入探討校園霸凌問題的沉重劇本，每個角色都面臨道德選擇。",
    storyBackground: "現代高中校園，社會階層和同儕壓力交織的複雜環境。",
    gameRules: ["扮演不同身份的學生", "面對道德選擇", "探討霸凌成因", "尋求解決方案"],
    characters: [
      {
        name: "受害者小明",
        description: "內向敏感的學生",
        background: "成績優秀但不善社交",
        relationship: ["被霸凌者"],
        secrets: ["家庭問題"],
        goals: ["獲得認同"]
      }
    ],
    requirements: ["6-8名玩家", "需要同理心", "約2.5小時"],
    tips: ["保持同理心", "理性討論"],
    images: ["/images/scripts/school-1.jpg"],
    features: ["社會議題", "心理探討", "教育意義"]
  },
  {
    id: "5",
    title: "江湖恩仇",
    description: "武俠世界中的恩怨情仇，刀光劍影間隱藏著不為人知的秘密。誰是真正的武林盟主？",
    coverImage: "/images/scripts/jianghu-revenge.jpg",
    author: "武俠迷",
    playerCount: { min: 4, max: 6 },
    duration: 220,
    difficulty: "hard",
    category: "ancient",
    tags: ["武俠", "江湖", "恩仇", "武功"],
    rating: 4.6,
    totalRatings: 89,
    favoriteCount: 54,
    playCount: 167,
    releaseDate: "2024-03-22",
    updatedAt: "2024-03-25",
    isNew: false,
    isHot: false,
    fullDescription: "江湖風雲，恩怨情仇。在刀光劍影中尋找真相，在利益糾葛中保持本心。",
    storyBackground: "明朝末年，江湖動蕩，各大門派爭奪武林盟主之位。",
    gameRules: ["武功比拼", "結盟背叛", "尋找寶物", "爭奪盟主"],
    characters: [
      {
        name: "劍客李逍遙",
        description: "瀟灑不羈的劍客",
        background: "名門正派弟子",
        relationship: ["與魔教有淵源"],
        secrets: ["身世之謎"],
        goals: ["為師報仇"]
      }
    ],
    requirements: ["4-6名玩家", "了解武俠文化", "約3.5小時"],
    tips: ["注意江湖規矩", "善用武功"],
    images: ["/images/scripts/jianghu-1.jpg"],
    features: ["武俠風格", "恩怨情仇", "門派爭鬥"]
  },
  {
    id: "6",
    title: "都市迷案",
    description: "現代都市中的連環殺手案，警察、記者、心理醫生等角色共同追尋真相。",
    coverImage: "/images/scripts/urban-mystery.jpg",
    author: "推理愛好者",
    playerCount: { min: 5, max: 7 },
    duration: 180,
    difficulty: "medium",
    category: "modern",
    tags: ["都市", "推理", "連環殺手", "現代"],
    rating: 4.4,
    totalRatings: 178,
    favoriteCount: 123,
    playCount: 445,
    releaseDate: "2024-06-08",
    updatedAt: "2024-06-10",
    isNew: true,
    isHot: true,
    fullDescription: "繁華都市中的連環謎案，多個專業角色攜手追查真相。",
    storyBackground: "現代大都市，連環案件震驚社會，各方勢力介入調查。",
    gameRules: ["收集證據", "分析案情", "角色專業技能", "團隊協作"],
    characters: [
      {
        name: "刑警隊長",
        description: "經驗豐富的資深警官",
        background: "多年辦案經驗",
        relationship: ["與記者合作"],
        secrets: ["過往失誤"],
        goals: ["破獲案件"]
      }
    ],
    requirements: ["5-7名玩家", "需要推理能力", "約3小時"],
    tips: ["邏輯推理", "證據分析"],
    images: ["/images/scripts/urban-1.jpg"],
    features: ["現代推理", "多職業視角", "邏輯燒腦"]
  },
  {
    id: "7",
    title: "魔法學院",
    description: "在一所神秘的魔法學院中，學生們必須解決一系列魔法謎題，同時面對內心的恐懼。",
    coverImage: "/images/scripts/magic-academy.jpg",
    author: "奇幻作家",
    playerCount: { min: 6, max: 8 },
    duration: 240,
    difficulty: "easy",
    category: "fantasy",
    tags: ["魔法", "學院", "奇幻", "冒險"],
    rating: 4.2,
    totalRatings: 145,
    favoriteCount: 98,
    playCount: 312,
    releaseDate: "2024-05-15",
    updatedAt: "2024-05-18",
    isNew: false,
    isHot: false,
    fullDescription: "魔法學院中的奇幻冒險，學生們需要運用魔法知識解決謎題。",
    storyBackground: "古老的魔法學院，隱藏著許多秘密和魔法謎題。",
    gameRules: ["學習魔法技能", "解決學院謎題", "團隊合作", "面對挑戰"],
    characters: [
      {
        name: "新生艾莉絲",
        description: "初入學院的魔法新生",
        background: "來自普通家庭",
        relationship: ["與導師關係密切"],
        secrets: ["特殊血統"],
        goals: ["掌握魔法"]
      }
    ],
    requirements: ["6-8名玩家", "想像力豐富", "約4小時"],
    tips: ["發揮想像力", "團隊配合"],
    images: ["/images/scripts/magic-1.jpg"],
    features: ["奇幻魔法", "學院生活", "冒險解謎"]
  },
  {
    id: "8",
    title: "末日求生",
    description: "世界末日來臨，一群倖存者必須在資源匱乏的環境中生存，同時面對人性的考驗。",
    coverImage: "/images/scripts/apocalypse-survival.jpg",
    author: "末日預言家",
    playerCount: { min: 4, max: 6 },
    duration: 200,
    difficulty: "hard",
    category: "modern",
    tags: ["末日", "求生", "人性", "資源"],
    rating: 4.7,
    totalRatings: 112,
    favoriteCount: 87,
    playCount: 198,
    releaseDate: "2024-06-25",
    updatedAt: "2024-06-28",
    isNew: true,
    isHot: true,
    fullDescription: "末日降臨，資源稀缺，人性在極端環境下的真實考驗。",
    storyBackground: "全球災難後的廢土世界，倖存者面臨生存挑戰。",
    gameRules: ["資源分配", "生存決策", "道德選擇", "團隊合作"],
    characters: [
      {
        name: "前軍人約翰",
        description: "有軍事經驗的倖存者",
        background: "退役軍人",
        relationship: ["團隊領導者"],
        secrets: ["隱瞞過去"],
        goals: ["保護團隊"]
      }
    ],
    requirements: ["4-6名玩家", "承受心理壓力", "約3.5小時"],
    tips: ["冷靜決策", "團隊至上"],
    images: ["/images/scripts/apocalypse-1.jpg"],
    features: ["末日題材", "生存挑戰", "人性考驗"]
  }
];
const getHotScripts = (scripts) => {
  return scripts.filter((script) => script.isHot).sort((a, b) => {
    const scoreA = a.rating * 0.4 + a.favoriteCount * 0.3 + a.playCount * 0.3;
    const scoreB = b.rating * 0.4 + b.favoriteCount * 0.3 + b.playCount * 0.3;
    return scoreB - scoreA;
  });
};
const getScriptById = (scripts, id) => {
  return scripts.find((script) => script.id === id);
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Header = ({
  title = "PlayHard 劇本殺",
  subtitle = "沉浸式體驗，探索無盡的劇本世界",
  className = ""
}) => {
  return /* @__PURE__ */ jsxs("header", { className: cn(
    "relative py-24 text-center overflow-hidden bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary",
    className
  ), children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-mystery-accent-primary/20 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsx("h1", { className: "text-6xl md:text-7xl font-bold text-mystery-text-primary mb-4 animate-glow hover:scale-105 transition-transform duration-300", children: title }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-mystery-text-secondary mb-12 max-w-2xl mx-auto", children: subtitle })
    ] })
  ] });
};
const Footer = ({ className = "" }) => {
  return /* @__PURE__ */ jsx("footer", { className: cn(
    "bg-mystery-bg-secondary border-t border-mystery-accent-primary/20 py-12 mt-auto",
    className
  ), children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary mb-4", children: "© 2024 PlayHard 劇本殺. All rights reserved." }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-6", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about",
          className: "text-mystery-accent-gold hover:text-mystery-accent-secondary transition-colors duration-300",
          children: "關於我們"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contact",
          className: "text-mystery-accent-gold hover:text-mystery-accent-secondary transition-colors duration-300",
          children: "聯繫我們"
        }
      )
    ] })
  ] }) });
};
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
const Route$4 = createRootRoute({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "PlayHard 劇本殺"
    }]
  }),
  loader: async () => await getGlobalData(),
  component: RootComponent,
  notFoundComponent: () => {
    return /* @__PURE__ */ jsx("div", { className: "not-found-page", children: /* @__PURE__ */ jsxs("div", { className: "not-found-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "404" }),
      /* @__PURE__ */ jsx("h2", { children: "頁面未找到" }),
      /* @__PURE__ */ jsx("p", { children: "抱歉，您訪問的頁面不存在。" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "back-home-btn", children: "返回首頁" })
    ] }) });
  }
});
function RootComponent() {
  const {
    totalScripts,
    hotScripts
  } = Route$4.useLoaderData();
  const router = useRouter();
  const isHomePage = router.state.location.pathname === "/";
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, { showStats: isHomePage, totalScripts, hotScripts }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx("title", { children: "PlayHard 劇本殺" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import('./index-CLAb060b.mjs');
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
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  loader: async () => await getScriptData()
});
const $$splitComponentImporter$2 = () => import('./index-BzAQrpMZ.mjs');
const Route$2 = createFileRoute("/contact/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import('./index-Btfo4iMb.mjs');
const getServerTime_createServerFn_handler = createServerRpc("src_routes_about_index_tsx--getServerTime_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getServerTime.__executeServer(opts, signal);
});
const getServerTime = createServerFn().handler(getServerTime_createServerFn_handler, async () => {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  return (/* @__PURE__ */ new Date()).toISOString();
});
const Route$1 = createFileRoute("/about/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitErrorComponentImporter = () => import('./_id-DS6E2gNL.mjs');
const $$splitComponentImporter = () => import('./_id-WD1xnbvo.mjs');
const Route = createFileRoute("/script/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params
  }) => {
    const script = getScriptById(mockScripts, params.id);
    if (!script) {
      throw new Error("Script not found");
    }
    return script;
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const ContactIndexRoute = Route$2.update({
  id: "/contact/",
  path: "/contact/",
  getParentRoute: () => Route$4
});
const AboutIndexRoute = Route$1.update({
  id: "/about/",
  path: "/about/",
  getParentRoute: () => Route$4
});
const ScriptIdRoute = Route.update({
  id: "/script/$id",
  path: "/script/$id",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  ScriptIdRoute,
  AboutIndexRoute,
  ContactIndexRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const routeTree_gen = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routeTree
}, Symbol.toStringTag, { value: "Module" }));
function createRouter() {
  const router = createRouter$1({
    routeTree,
    scrollRestoration: true
  });
  return router;
}
const serverEntry$1 = createStartHandler({
  createRouter
})(defaultStreamHandler);
const serverEntry = defineEventHandler(function(event) {
  const request = toWebRequest(event);
  return serverEntry$1({ request });
});

export { Footer as F, Header as H, Route$3 as R, Route as a, createServerFn as b, createServerRpc as c, cn as d, serverEntry as default, getHotScripts as g, mockScripts as m };
//# sourceMappingURL=ssr.mjs.map
