'use client'

import { useTheme } from 'next-themes'
import Cloud from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/joy/styles';
import { useEffect } from 'react';

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme()
  const { mode, setMode } = useColorScheme();

  useEffect(
    () => {
      setTheme(mode as string);
    }, [mode])
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
            return setMode('light')
          }
          return setMode('dark')
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