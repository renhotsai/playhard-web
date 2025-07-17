import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { S as Separator, a as Badge, C as Card, b as CardHeader, c as CardTitle, e as CardDescription, d as CardContent } from './separator-B17L11j9.mjs';
import { d as cn } from './ssr.mjs';

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
const ScriptCard = ({ script, className = "" }) => {
  return /* @__PURE__ */ jsxs(Card, { className: cn("group overflow-hidden border-2 border-mystery-accent-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-mystery-accent-gold/50 shadow-xl", className), style: { backgroundColor: "#2a2a2a" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: script.coverImage,
          alt: script.title,
          className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 flex gap-1", children: [
        script.isNew && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "bg-mystery-accent-primary hover:bg-mystery-accent-primary text-white", children: "\u65B0" }),
        script.isHot && /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-gold hover:bg-mystery-accent-gold text-black font-semibold", children: "\u71B1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", style: { backgroundColor: "#2a2a2a" }, children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-mystery-text-primary text-lg font-bold line-clamp-2", children: script.title }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-mystery-text-secondary text-sm line-clamp-2", children: script.description })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", style: { backgroundColor: "#2a2a2a" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-sm text-mystery-text-secondary", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-mystery-accent-primary/30 text-mystery-text-secondary", children: script.playerCount.min === script.playerCount.max ? `${script.playerCount.min}\u4EBA` : `${script.playerCount.min}-${script.playerCount.max}\u4EBA` }),
        /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-mystery-accent-primary/30 text-mystery-text-secondary", children: [
          script.duration,
          "\u5206\u9418"
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-mystery-accent-primary/30 text-mystery-text-secondary", children: difficultyLabels[script.difficulty] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-mystery-accent-gold/10 px-3 py-2 rounded-lg border border-mystery-accent-gold/30", children: [
        /* @__PURE__ */ jsx("span", { className: "text-mystery-accent-gold text-lg", children: "\u2605" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "text-mystery-accent-gold font-bold text-lg leading-none", children: script.rating }),
          /* @__PURE__ */ jsx("span", { className: "text-mystery-text-muted text-xs", children: "\u8A55\u5206" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: script.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs bg-mystery-bg-hover text-mystery-text-muted", children: tag }, tag)) }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(Badge, { className: "bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30", children: categoryLabels[script.category] }) }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/script/$id",
          params: { id: script.id },
          className: "block"
        }
      )
    ] })
  ] });
};
const HotRecommendations = ({ scripts, className = "" }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const totalScripts = scripts.length;
  const getCardTransform = useCallback((index) => {
    const offset = (index - activeIndex + totalScripts) % totalScripts;
    const positions = [
      { x: 0, scale: 1, z: 5, opacity: 1, blur: 0 },
      // 中心
      { x: 160, scale: 0.85, z: 4, opacity: 0.8, blur: 0 },
      // 右1
      { x: 280, scale: 0.7, z: 3, opacity: 0.6, blur: 1 },
      // 右2
      { x: -280, scale: 0.7, z: 2, opacity: 0.6, blur: 1 },
      // 左2
      { x: -160, scale: 0.85, z: 3, opacity: 0.8, blur: 0 }
      // 左1
    ];
    return positions[offset] || positions[0];
  }, [activeIndex, totalScripts]);
  const handleCardClick = useCallback((index, scriptId) => {
    if (index === activeIndex) {
      navigate({ to: "/script/$id", params: { id: scriptId } });
    } else {
      setIsAutoPlayPaused(true);
      setActiveIndex(index);
      setTimeout(() => setIsAutoPlayPaused(false), 5e3);
    }
  }, [activeIndex, navigate]);
  useCallback(() => {
    setIsAutoPlayPaused(true);
  }, []);
  useCallback(() => {
    setIsAutoPlayPaused(false);
  }, []);
  useEffect(() => {
    if (isAutoPlayPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalScripts);
    }, 4e3);
    return () => clearInterval(interval);
  }, [totalScripts, isAutoPlayPaused]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIsAutoPlayPaused(true);
        setActiveIndex((prev) => (prev - 1 + totalScripts) % totalScripts);
        setTimeout(() => setIsAutoPlayPaused(false), 5e3);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIsAutoPlayPaused(true);
        setActiveIndex((prev) => (prev + 1) % totalScripts);
        setTimeout(() => setIsAutoPlayPaused(false), 5e3);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalScripts]);
  const displayScripts = scripts.slice(0, 5);
  return /* @__PURE__ */ jsx("section", { className: cn("w-full py-16 bg-mystery-bg-secondary/50", className), children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-mystery-text-primary mb-4", children: "\u71B1\u9580\u63A8\u85A6" }),
      /* @__PURE__ */ jsx("p", { className: "text-mystery-text-secondary text-lg", children: "\u73A9\u5BB6\u6700\u611B\u7684\u7CBE\u5F69\u5287\u672C" }),
      /* @__PURE__ */ jsx(Separator, { className: "mx-auto mt-6 w-24 bg-mystery-accent-gold" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-6xl", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative h-[480px] flex items-center justify-center overflow-visible",
        style: { perspective: "1000px" },
        children: displayScripts.map((script, index) => {
          const transform = getCardTransform(index);
          const isActive = index === activeIndex;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute w-[320px] cursor-pointer transition-all duration-700 ease-out",
                "hover:scale-105"
              ),
              style: {
                transform: `translate(-50%, -50%) translateX(${transform.x}px) scale(${transform.scale})`,
                left: "50%",
                top: "50%",
                zIndex: transform.z,
                opacity: transform.opacity,
                filter: `blur(${transform.blur}px)`
              },
              onClick: () => handleCardClick(index, script.id),
              children: /* @__PURE__ */ jsxs("div", { className: "relative h-full", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -left-3 z-10", children: /* @__PURE__ */ jsx(
                  Badge,
                  {
                    className: cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xl border-2",
                      index === 0 && "bg-mystery-accent-gold text-black border-yellow-300 animate-pulse",
                      index === 1 && "bg-gray-400 text-white border-gray-300",
                      index === 2 && "bg-orange-600 text-white border-orange-400",
                      index === 3 && "bg-mystery-accent-primary text-white border-mystery-accent-secondary",
                      index === 4 && "bg-purple-600 text-white border-purple-400"
                    ),
                    children: index + 1
                  }
                ) }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "relative h-full rounded-xl overflow-hidden",
                      "border-2 transition-all duration-300",
                      isActive ? "border-mystery-accent-gold shadow-2xl shadow-mystery-accent-gold/30" : "border-mystery-accent-primary/20 shadow-xl",
                      "transform-gpu backdrop-blur-sm"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        ScriptCard,
                        {
                          script,
                          className: cn(
                            "h-full border-0 transition-all duration-300",
                            isActive && "ring-2 ring-mystery-accent-gold/50"
                          )
                        }
                      ),
                      isActive && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 rounded-xl", children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl border-2 border-mystery-accent-gold/50 animate-pulse" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 rounded-xl bg-gradient-to-r from-mystery-accent-gold/20 to-mystery-accent-secondary/20 blur-xl -z-10" })
                      ] })
                    ]
                  }
                )
              ] })
            },
            script.id
          );
        })
      }
    ) })
  ] }) });
};

export { HotRecommendations as H };
//# sourceMappingURL=HotRecommendations-CmaYdK7c.mjs.map
