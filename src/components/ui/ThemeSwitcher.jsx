import { Moon, Sun } from "lucide-react";
import { useTheme } from "@context";
import { useRef } from "react";
import { flushSync } from "react-dom";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef(null);
  const isDark = theme === "dark";

  function handleToggle() {
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    document
      .startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      })
      .ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-200 text-zinc-900 transition-colors duration-300 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation: none;
              mix-blend-mode: normal;
            }
          `,
        }}
      />
    </>
  );
}
