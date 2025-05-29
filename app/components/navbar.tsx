'use client'

import Link from 'next/link';

export default function Navbar() {
  return (
     // navbar
      <nav className="bg-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-12 ml-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            Pet Shop
          </Link>
    
          {/* Menu */}
          <div className="space-x-8 flex items-center">
            <div className="relative group">
              <div className="flex items-center text-gray-600 hover:text-black cursor-pointer">
                <button className="mr-1">สินค้า</button>
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="absolute left-0  w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
                <Link href="/product/dog-food" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อาหารสุนัข
                </Link>
                <Link href="/product/cat-food" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อาหารแมว
                </Link>
                <Link href="/product/smallpets" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อาหารสัตว์เล็ก
                </Link>
                <Link href="/product/accessory-dog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อุปกรณ์สำหรับสุนัข
                </Link>
                <Link href="/product/accessory-cat" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อุปกรณ์สำหรับแมว
                </Link>
                <Link href="/product/accessory-smallpets" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  อุปกรณ์สำหรับสัตว์เล็ก
                </Link>
                <Link href="/product/toys" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  ของเล่นสัตว์เลี้ยง
                </Link>
                <Link href="/product/health" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  ผลิตภัณฑ์ดูแลสุขภาพ
                </Link>
                <Link href="/product/cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  ผลิตภัณฑ์ความสะอาดและดูแลขน
                </Link>
              </div>
            </div>

            <Link href="/service" className="text-gray-600 hover:text-black">
              บริการของเรา
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-black">
              บทความ
            </Link>
            <Link href="/brands" className="text-gray-600 hover:text-black">
              แบรนด์
            </Link>
            <Link href="/contactus" className="text-gray-600 hover:text-black">
              ติดต่อเรา
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 w-86 relative ">
          <svg
            className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            className="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring focus:border-blue-300"
            aria-label="Search"
          />
            {/* Cart and Profile Icons */}
          <div className='flex items-center space-x-4 ml-4 '>
            <Link href="/cart">
              <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <Link href="/profile">
              <svg className="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    );
    
}