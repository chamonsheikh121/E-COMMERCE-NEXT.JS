import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import { cn } from '@/lib/utils'
import { ChevronDown, User, Package, LogOut, Settings } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default async function UserButton() {
  const t = await getTranslations()
  const session = await auth()
  
  // Get user initials for avatar
  const getUserInitials = (name:string) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full"
          >
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="text-primary font-medium">
                {session ? getUserInitials(session.user.name as string) : '?'}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs text-muted-foreground">
                {t('Header.Hello')}, {session ? session.user.name : t('Header.sign in')}
              </span>
              <span className="text-xs font-semibold">
                {t('Header.Account & Orders')}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        
        {session ? (
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="p-4 border-b">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            
            <div className="p-2">
              <DropdownMenuGroup>
                <Link className="w-full" href="/account">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
                    <User className="h-4 w-4" />
                    <span>{t('Header.Your account')}</span>
                  </DropdownMenuItem>
                </Link>
                
                <Link className="w-full" href="/account/orders">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
                    <Package className="h-4 w-4" />
                    <span>{t('Header.Your orders')}</span>
                  </DropdownMenuItem>
                </Link>
                
                {session.user.role === 'Admin' && (
                  <Link className="w-full" href="/admin/overview">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2">
                      <Settings className="h-4 w-4" />
                      <span>{t('Header.Admin')}</span>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="my-2" />
              
              <form action={SignOut} className="w-full">
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 py-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('Header.Sign out')}
                </Button>
              </form>
            </div>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <div className="p-4 space-y-4">
              <Link
                className={cn("w-full bg-primary text-white hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 py-2 px-4")}
                href="/sign-in"
              >
                {t('Header.Sign in')}
              </Link>
              
              <div className="text-center text-sm">
                {t('Header.New Customer')}?{' '}
                <Link href="/sign-up" className="font-medium text-primary hover:underline">
                  {t('Header.Sign up')}
                </Link>
              </div>
            </div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}