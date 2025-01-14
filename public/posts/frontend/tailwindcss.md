---
title: nextjs tailwindcss 配置主题
date: 2024-01-13 12:34:01
tags: tailwindcss
---

#### 1. tailwindcss项目主题设置搭配
- 如果使用第三方(例如[shadcn-ui](https://ui.shadcn.com/),[mui](https://mui.com/material-ui/customization/dark-mode/))框架,可以参考Theme部分配置

#### 2. 使用主题

```javascript
//theme.js

const tailwindColors = require('tailwindcss/colors')

const darkShade = 600
const lightShade = 300
const defaultShade = 500
const neutralLightShade = 50
const neutralDarkShade = 950

export const colors = {
  neutral: tailwindColors.slate,
  brand: tailwindColors.violet,
  success: tailwindColors.teal,
  warn: tailwindColors.orange,
  danger: tailwindColors.red,
  info: tailwindColors.cyan,
}

export const getThemeColors = color => {
  return {
    DEFAULT: color[defaultShade],
    l: color[lightShade],
    d: color[darkShade],
    ...color,
  }
}

export const getNeutral = shade => {
  return shade === 'light' ? neutralLightShade : shade === 'dark' ? neutralDarkShade : colors.neutral[shade]
}

```

```javascript
//tailwind.config.js

import { colors, getNeutral, getThemeColors } from './src/styles/theme'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: getNeutral('dark'),
        light: getNeutral('light'),
        neutral: getThemeColors(colors.neutral),
        brand: getThemeColors(colors.brand),
        success: getThemeColors(colors.success),
        warn: getThemeColors(colors.warn),
        danger: getThemeColors(colors.danger),
        info: getThemeColors(colors.info),
      },
    },
  },
  plugins: [],
}

```
####  使用 CSS Variables
```javascript
// tailwind.config.js

const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
    },
  }
}
```

```CSS
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --radius: 0.5rem;
  }
/* 
根据tailwind.config.js配置属性来，这里这样设置可以兼容mui模式
 [data-joy-color-scheme="dark"] {

}
*/
  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

#### 使用 <pre>next-themes</pre> <pre>@mui/joy</pre><pre>tailwindcss</pre> 切换 Dark Light模式
1. 配置tailwind.config.js的 <pre>darkMode</pre>属性值为<pre>[data-joy-color-scheme="dark"]</pre>(mui/joy通过此属性切换主题)
2. 调用<pre>setTheme</pre>方法切换主题


```jsx
"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from 'next-themes'
import { CssVarsProvider } from '@mui/joy/styles';

const ClientContext = ({ children }: { children: React.ReactNode }) => {
    const { message, openSnackbar, setOpenSnackbar } = useSnackbar();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // 页面挂载完成
        return () => {
            setIsMounted(false); // 页面卸载
        };
    }, []);

    if (!isMounted) {
        return false;
    }

    return (
        isMounted ? (
            <ThemeProvider attribute="data-joy-color-scheme">
                <CssVarsProvider>
                    {children}
                </CssVarsProvider>
            </ThemeProvider>
        ) : <div>isMounting</div>
    );
};

export default ClientContext;

```
```jsx
'use client'

import { useTheme } from 'next-themes'
import Icon from "@/components/Icon";

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={theme === 'light'}
        onChange={() => {
          if (theme === 'dark') {
            return setTheme('light')
          }
          return setTheme('dark')
        }}
      />
      <label className="cursor-pointer" htmlFor="light-switch">
        {theme === "dark" ? (
          <Icon.Moon />
        ) : (
          <Icon.Sun />
        )}
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  )
}
```

```javascript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-joy-color-scheme="dark"]'],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        link: "var(--link)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      }
    }
  },
  plugins: [],
};
export default config;

```
#### 参考
- [tailwind-dynamic-color-theme-solution](https://medium.com/@oodri/tailwind-dynamic-color-theme-solution-4351d0495c7f)
- [next-themes](https://github.com/pacocoursey/next-themes)