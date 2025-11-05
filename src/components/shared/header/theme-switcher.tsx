'use client'

import { ChevronDownIcon, Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useColorStore from '@/hooks/use-color-store'
import { cn } from '@/lib/utils'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getActiveThemeIcon = () => {
    if (!mounted) return <Laptop className="h-4 w-4" />
    const currentTheme = theme === 'system' ? systemTheme : theme
    return currentTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  }

  const getActiveThemeLabel = () => {
    if (!mounted) return 'System'
    if (theme === 'system') return 'System'
    return theme === 'dark' ? 'Dark' : 'Light'
  }

  if (!mounted) {
    return (
      <div className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
        'h-[42px] opacity-50 cursor-not-allowed'
      )}>
        <Laptop className="h-4 w-4" />
        <span>{'System'}</span>
        <ChevronDownIcon className="h-3 w-3 opacity-70" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50',
        'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-700',
        'h-[42px]'
      )}>
        <div className="flex items-center gap-2">
          {getActiveThemeIcon()}
          <span>{getActiveThemeLabel()}</span>
          <ChevronDownIcon className="h-3 w-3 opacity-70" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        align="end"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {'Theme'}
        </DropdownMenuLabel>
        
        <DropdownMenuRadioGroup 
          value={theme || 'system'} 
          onValueChange={setTheme}
          className="space-y-1"
        >
          <DropdownMenuRadioItem 
            value="light"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Sun className="h-4 w-4" />
            <span>{'Light'}</span>
          </DropdownMenuRadioItem>
          
          <DropdownMenuRadioItem 
            value="dark"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Moon className="h-4 w-4" />
            <span>{'Dark'}</span>
          </DropdownMenuRadioItem>
          
          <DropdownMenuRadioItem 
            value="system"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Laptop className="h-4 w-4" />
            <span>{'System'}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />

        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {'Accent Color'}
        </DropdownMenuLabel>
        
        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
          className="grid grid-cols-4 gap-2 p-2"
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem 
              key={c.name} 
              value={c.name}
              className="p-0 w-full h-8 rounded-md overflow-hidden"
            >
              <div
                style={{ backgroundColor: c.name }}
                className="w-full h-full flex items-center justify-center"
                title={c.name}
              >
                {color.name === c.name && (
                  <div className="w-2 h-2 rounded-full bg-white dark:bg-black mix-blend-difference" />
                )}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}