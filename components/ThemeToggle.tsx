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