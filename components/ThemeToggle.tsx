'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Icon from "@/components/Icon";

/*
 * 原来用 `theme` 判断明暗。它是 'light' | 'dark' | 'system'，而首访和「跟随系统」时都是 'system'，
 * 于是图标永远画成太阳、checked 永远 false、第一次点击设成 'dark' —— 在系统本来就是深色的机器上
 * 这一下什么都不会变，看起来就是开关坏了。
 *
 * 现在读 resolvedTheme（系统偏好已解析成 light/dark），并在挂载后才画图标：
 * 服务端拿不到系统偏好，先画一个同样尺寸的占位，避免首帧与实际状态画出两个不同图标。
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="sr-only"
        checked={isDark}
        onChange={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <label className="cursor-pointer" htmlFor="light-switch">
        {mounted ? (
          isDark ? <Icon.Moon /> : <Icon.Sun />
        ) : (
          <span className="block w-6 h-6" aria-hidden="true" />
        )}
        <span className="sr-only">切换深色模式</span>
      </label>
    </div>
  )
}
