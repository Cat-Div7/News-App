import { Moon, Sun } from "lucide-react";
import { useTheme } from "@context";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { IconButton } from "@mui/material";

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
      <IconButton
        ref={buttonRef}
        onClick={handleToggle}
        sx={{
          backgroundColor: "rgb(228, 228, 231)", // zinc-200
          "&:hover": {
            backgroundColor: "rgb(212, 212, 216)", // zinc-300
          },
          ".dark &": {
            backgroundColor: "rgb(39, 39, 42)", // zinc-800
            "&:hover": {
              backgroundColor: "rgb(63, 63, 70)", // zinc-700
            },
          },
          border: "1px solid",
          borderColor: "divider",
        }}
        className="relative h-8 w-8 transition-colors duration-300"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </IconButton>

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
