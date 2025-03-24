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
      <div className="flex gap-2">
        {items.map((item) => (
          <div key={item.slug} className="relative group">
            <Link 
              href={`/${item.slug}`}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
            >
              {item.title}
            </Link>
            {item.children.length > 0 && (
              <div className="absolute left-0 mt-2 w-[600px] invisible group-hover:visible bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4 z-50">
                <div className="border-r dark:border-gray-700 pr-4">
                  {/* Level 2 */}
                  {item.children.map((child) => (
                    <div key={child.slug}>
                      <Link
                        href={`/${child.slug}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
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
                        <div key={child.slug}>
                          {child.children.map(grandChild => (
                            <div key={grandChild.slug} className="mb-4">
                              <Link
                                href={`/${grandChild.slug}`}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                              >
                                {grandChild.title}
                              </Link>
                              {/* Level 4 */}
                              <div className="ml-4">
                                {grandChild.children.map(greatGrandChild => (
                                  <Link
                                    key={greatGrandChild.slug}
                                    href={`/${greatGrandChild.slug}`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
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
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 py-4">
      <div className="container mx-auto flex items-center gap-6">
        <Link href="/" className="text-xl font-bold">
          99Notes
        </Link>
        <NestedNavigation items={navigation} />
      </div>
    </nav>
  )
}
