'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
import useShowSidebar from '@/hooks/use-cart-sidebar'
import { cn } from '@/lib/utils'
import useCartStore from '@/hooks/use-cart-store'
import { useLocale, useTranslations } from 'next-intl'
import { getDirection } from '@/i18n-config'


export default function CartButton() {
  const isMounted = useIsMounted()
  const {
    cart: { items },
  } = useCartStore()
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
  const showSidebar = useShowSidebar()
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = getDirection(locale) === 'rtl'

  return (
    <Link 
      href="/cart" 
      className="relative flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full"
    >
      <div className="relative">
        <ShoppingBag className="h-6 w-6 text-slate-800 dark:text-slate-200" strokeWidth={1.5} />
        
        {isMounted && cartItemsCount > 0 && (
          <span
           
            
            className={cn(
              "absolute inline-flex items-center justify-center rounded-full bg-primary text-white text-xs font-medium",
              cartItemsCount >= 10 ? "min-w-5 h-5 px-1" : "w-5 h-5",
              isRTL ? "-top-1 -left-1" : "-top-1 -right-1"
            )}
          >
            {cartItemsCount}
          </span>
        )}
      </div>
      
      <span className="text-sm font-medium hidden md:inline-block">
        {t('Header.Cart')}
      </span>
      
      {showSidebar && (
        <div 
          className={cn(
            "absolute w-3 h-3 bg-background rotate-45 transform", 
            isRTL
              ? "left-1 top-10" 
              : "right-1 top-10"
          )}
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)"
          }}
        />
      )}
    </Link>
  )
}