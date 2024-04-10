'use client'

import { useTheme } from 'next-themes'
import Cloud from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

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
          <Cloud />
        ) : (
          <Sun />
        )}
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  )
}