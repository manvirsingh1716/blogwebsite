'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  slug: string
  title: string
  children: NavItem[]
}

interface NavbarProps {
  navigation: NavItem[]
}

function NestedNavigation({ items, level = 1 }: { items: NavItem[], level?: number }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  if (level === 1) {
    return (
      <div className="flex gap-6">
        {items.map((item) => (
          <div key={item.slug} className="relative group">
            <Link 
              href={`/${item.slug}`}
              className="px-3 py-2 text-white hover:bg-primary-600 rounded-md text-sm transition-colors duration-200"
            >
              {item.title}
            </Link>
            {item.children.length > 0 && (
              <div className="absolute left-0 mt-2 w-[600px] invisible group-hover:visible bg-white rounded-xl shadow-xl p-4 grid grid-cols-2 gap-4 z-50 border border-gray-100">
                <div className="border-r border-gray-100 pr-4">
                  {/* Level 2 */}
                  {item.children.map((child) => (
                    <div key={child.slug}>
                      <Link
                        href={`/${child.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors duration-200"
                        onMouseEnter={() => setOpenDropdown(child.slug)}
                      >
                        {child.title}
                      </Link>
                    </div>
                  ))}
                </div>
                <div>
                  {/* Level 3 and 4 */}
                  {openDropdown && items.map(item =>
                    item.children.map(child =>
                      child.slug === openDropdown && (
                        <div key={child.slug} className="space-y-2">
                          {child.children.map(grandChild => (
                            <div key={grandChild.slug}>
                              <Link
                                href={`/${grandChild.slug}`}
                                className="block px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors duration-200"
                              >
                                {grandChild.title}
                              </Link>
                              <div className="pl-4">
                                {grandChild.children.map(greatGrandChild => (
                                  <Link
                                    key={greatGrandChild.slug}
                                    href={`/${greatGrandChild.slug}`}
                                    className="block px-4 py-1.5 text-sm text-gray-500 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors duration-200"
                                  >
                                    {greatGrandChild.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default function Navbar({ navigation }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-primary-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-white font-bold text-xl flex items-center gap-2">
              <span className="bg-white text-primary-500 px-2 py-1 rounded font-black">99</span>
              Notes
            </Link>
            <NestedNavigation items={navigation} />
          </div>
        </div>
      </div>
    </nav>
  )
}
