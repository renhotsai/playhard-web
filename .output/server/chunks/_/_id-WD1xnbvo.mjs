import { jsx, jsxs } from 'react/jsx-runtime';
import { B as Button, C as Card, a as Badge, b as CardHeader, c as CardTitle, d as CardContent, e as CardDescription, S as Separator } from './separator-B17L11j9.mjs';
import { ArrowLeft, Users, Clock, Target, Star, Heart, Share2 } from 'lucide-react';
import { a as Route } from './ssr.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-separator';
import '@tanstack/react-router';
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

const SplitComponent = function ScriptDetail() {
  const script = Route.useLoaderData();
  const difficultyLabels = {
    easy: "\u7C21\u55AE",
    medium: "\u4E2D\u7B49",
    hard: "\u56F0\u96E3",
    expert: "\u5C08\u5BB6"
  };
  const categoryLabels = {
    mystery: "\u61F8\u7591",
    horror: "\u6050\u6016",
    modern: "\u73FE\u4EE3",
    ancient: "\u53E4\u98A8",
    fantasy: "\u5947\u5E7B",
    emotion: "\u60C5\u611F"
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("nav", { className: "mb-8", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "text-mystery-accent-gold hover:bg-mystery-bg-card hover:text-mystery-accent-secondary", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "\u8FD4\u56DE\u9996\u9801"
    ] }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "mb-8 overflow-hidden border-mystery-accent-primary/20 bg-mystery-bg-card", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("img", { src: script.coverImage, alt: script.title, className: "w-full h-80 object-cover rounded-lg" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 flex gap-2", children: [
          script.isNew && /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-primary text-white", children: "\u65B0" }),
          script.isHot && /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-gold text-black", children: "\u71B1" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-mystery-text-primary mb-2", children: script.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-mystery-text-secondary text-lg", children: [
            "\u4F5C\u8005\uFF1A",
            script.author
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-mystery-bg-hover rounded-lg", children: [
            /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-mystery-text-muted", children: "\u4EBA\u6578" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-mystery-text-primary", children: script.playerCount.min === script.playerCount.max ? `${script.playerCount.min}\u4EBA` : `${script.playerCount.min}-${script.playerCount.max}\u4EBA` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-mystery-bg-hover rounded-lg", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-mystery-text-muted", children: "\u6642\u9577" }),
            /* @__PURE__ */ jsxs("div", { className: "font-semibold text-mystery-text-primary", children: [
              script.duration,
              "\u5206\u9418"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-mystery-bg-hover rounded-lg", children: [
            /* @__PURE__ */ jsx(Target, { className: "h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-mystery-text-muted", children: "\u96E3\u5EA6" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-mystery-text-primary", children: difficultyLabels[script.difficulty] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-mystery-bg-hover rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-mystery-text-muted", children: "\u985E\u578B" }),
            /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30", children: categoryLabels[script.category] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-mystery-accent-gold fill-current" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-mystery-accent-gold text-lg", children: script.rating }),
            /* @__PURE__ */ jsxs("span", { className: "text-mystery-text-muted text-sm", children: [
              "(",
              script.totalRatings,
              "\u4EBA\u8A55\u5206)"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-sm text-mystery-text-secondary", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
              script.favoriteCount,
              " \u6536\u85CF"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "\u{1F3AE} ",
              script.playCount,
              " \u6B21\u904A\u6232"
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary flex items-center gap-2", children: "\u5287\u672C\u7C21\u4ECB" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary leading-relaxed", children: script.description }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u8A73\u7D30\u6545\u4E8B" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary leading-relaxed", children: script.fullDescription }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u6545\u4E8B\u80CC\u666F" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary leading-relaxed", children: script.storyBackground }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u904A\u6232\u898F\u5247" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: script.gameRules.map((rule, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-mystery-text-secondary", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "mt-0.5 border-mystery-accent-gold text-mystery-accent-gold", children: index + 1 }),
            /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: rule })
          ] }, index)) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u89D2\u8272\u4ECB\u7D39" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: script.characters.map((character, index) => /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/10 bg-mystery-bg-hover", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-accent-gold text-lg", children: character.name }),
              /* @__PURE__ */ jsx(CardDescription, { className: "text-mystery-text-secondary", children: character.description })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-mystery-text-primary mb-2", children: "\u80CC\u666F" }),
                /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary text-sm leading-relaxed", children: character.background })
              ] }),
              /* @__PURE__ */ jsx(Separator, { className: "bg-mystery-accent-primary/20" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-mystery-text-primary mb-2", children: "\u4EBA\u969B\u95DC\u4FC2" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: character.relationship.map((rel, i) => /* @__PURE__ */ jsxs("li", { className: "text-mystery-text-secondary text-sm flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-mystery-accent-gold rounded-full mt-2 flex-shrink-0" }),
                  rel
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsx(Separator, { className: "bg-mystery-accent-primary/20" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-mystery-text-primary mb-2", children: "\u76EE\u6A19" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: character.goals.map((goal, i) => /* @__PURE__ */ jsxs("li", { className: "text-mystery-text-secondary text-sm flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-mystery-accent-secondary rounded-full mt-2 flex-shrink-0" }),
                  goal
                ] }, i)) })
              ] })
            ] })
          ] }, index)) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u904A\u6232\u8981\u6C42" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: script.requirements.map((req, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-mystery-text-secondary text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-mystery-accent-primary rounded-full mt-2 flex-shrink-0" }),
            req
          ] }, index)) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u904A\u6232\u63D0\u793A" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: script.tips.map((tip, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-mystery-text-secondary text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-mystery-accent-gold rounded-full mt-2 flex-shrink-0" }),
            tip
          ] }, index)) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u5287\u672C\u7279\u8272" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: script.features.map((feature, index) => /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30", children: feature }, index)) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary", children: "\u76F8\u95DC\u6A19\u7C64" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: script.tags.map((tag, index) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-mystery-bg-hover text-mystery-text-muted", children: tag }, index)) }) })
        ] }),
        /* @__PURE__ */ jsx(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Button, { className: "w-full bg-mystery-accent-primary hover:bg-mystery-accent-secondary text-white", children: [
            /* @__PURE__ */ jsx(Heart, { className: "mr-2 h-4 w-4" }),
            "\u6536\u85CF\u5287\u672C"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full border-mystery-accent-gold text-mystery-accent-gold hover:bg-mystery-accent-gold hover:text-black", children: [
            /* @__PURE__ */ jsx(Share2, { className: "mr-2 h-4 w-4" }),
            "\u5206\u4EAB\u5287\u672C"
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(Card, { className: "border-mystery-accent-primary/20 bg-mystery-bg-card", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-mystery-text-muted", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            "\u767C\u5E03\u6642\u9593\uFF1A",
            script.releaseDate
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            "\u66F4\u65B0\u6642\u9593\uFF1A",
            script.updatedAt
          ] })
        ] }) }) })
      ] })
    ] })
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=_id-WD1xnbvo.mjs.map
