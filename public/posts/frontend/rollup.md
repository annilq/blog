---
title: 使用rollup与storyboard开发一个React组件库
date: 2024-04-24 14:48:15
---

### rollup配置说明
```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
// Rollup by default always removes directives like 'use client' from the top of files. 
// This plugin preserves directives when preserveModules: true is set in the Rollup config.
import preserveDirectives from "rollup-plugin-preserve-directives";

import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        // dir: "dist",
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        // dir: "dist",
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(
        {
          minimize: true,
          modules: true,
          use: {
            sass: null,
            stylus: null,
            less: { javascriptEnabled: true }
          },
          extract: true,
          plugins: [tailwindcss(), autoprefixer(),]
        }
      ),
      preserveDirectives({ exclude: ["**/*.scss", "**/*.pcss"], suppressPreserveModulesWarning: true }),
      terser({ compress: { directives: false }, })
    ],
    // external: ["react", "react-dom", "antd","@ant-design/pro-components","@ant-design/icons"],
    external:Object.keys(packageJson.peerDependencies),

    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
        warn(warning);
      }
    },
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

```
以下是每个插件的作用及简要说明：

1. **@rollup/plugin-node-resolve**：
   - **作用**：用于帮助 Rollup 解析 Node.js 模块。
   - **说明**：它允许你导入 Node.js 中的第三方模块，以便在打包时能正确地解析这些模块。

2. **@rollup/plugin-commonjs**：
   - **作用**：将 CommonJS 模块转换为 ES6 模块。
   - **说明**：许多 Node.js 模块使用 CommonJS 格式，而 Rollup 默认只支持 ES6 模块。这个插件能够将 CommonJS 格式的模块转换为 ES6 格式，以便在 Rollup 中使用。

3. **@rollup/plugin-terser**：
   - **作用**：使用 Terser 插件来压缩生成的 JavaScript 代码。
   - **说明**：Terser 是一个 JavaScript 压缩器和美化器，能够有效地减小代码体积，提高加载速度。

4. **@rollup/plugin-typescript**：
   - **作用**：允许 Rollup 编译 TypeScript 文件。
   - **说明**：这个插件允许你在 Rollup 中使用 TypeScript，将 TypeScript 文件编译为 JavaScript。

5. **rollup-plugin-preserve-directives**：
   - **作用**：保留特定指令的代码，通常与 postcss 配合使用，以保留某些 CSS 文件中的指令。
   - **说明**：当你使用某些 CSS 预处理器时，可能会在 CSS 文件中使用一些特定的指令，例如 `@import`。这个插件可以确保这些指令不会被 Rollup 移除。

6. **rollup-plugin-dts**：
   - **作用**：生成 TypeScript 的声明文件（`.d.ts` 文件）。
   - **说明**：这个插件用于为 TypeScript 项目生成类型声明文件，以便其他 TypeScript 项目在引用你的库时能够获得类型提示和类型检查的支持。

7. **rollup-plugin-postcss**：
   - **作用**：用于在 Rollup 中处理 CSS 文件，支持使用 PostCSS 插件进行各种转换，如压缩、模块化、autoprefixer 等。
   - **说明**：这个插件允许你在 Rollup 中处理 CSS 文件，可以使用 PostCSS 插件对 CSS 进行各种转换和处理，例如压缩、模块化等。


### storyboard 配置tailwindcss说明
#### storyboard默认使用vite构建，默认是支持**postcss**
- 1. 按照[**postcss**添加**tailwindcss**](https://tailwindcss.com/docs/installation/using-postcss)
- 2. 配置storyboard **.storybook/preview.ts**
```javascript
import type { Preview } from "@storybook/react";
import '../tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

```

#### 注意事项，最开始组件库依赖umi，间接依赖react，在设置**external**时候没有把react排除，导致build之后没有把react排除，后续将**react**与**react-dom**加入peerDependencies，并剔除**umi**

#### 参考
- [How to build a component library with React and TypeScript](https://blog.logrocket.com/how-to-build-component-library-react-typescript/)
- [Integrate Tailwind CSS and Storybook](https://storybook.js.org/recipes/tailwindcss)
