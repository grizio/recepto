import { TransitionConfig } from "svelte/types/runtime/transition"

type EasingFunction = (t: number) => number;
type Parameters = {
  delay?: number
  duration?: number
  easing?: EasingFunction
}

export default function hiddenFade(node: Element & ElementCSSInlineStyle, { delay = 0, duration = 400, easing }: Parameters): TransitionConfig {
  const o = +getComputedStyle(node).opacity
  return {
    delay,
    duration,
    easing,
    css: t => `opacity: ${t * o}`,
    tick: t => {
      if (t === 0) {
        node.style.position = "fixed"
      } else {
        node.style.position = "static"
      }
    }
  }
}