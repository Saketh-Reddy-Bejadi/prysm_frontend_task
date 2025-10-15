import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-zinc-100 fixed z-50 h-14" style={{ zIndex: 100 }}>
      <div className="mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6 py-0 h-14">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center">
            <Image
              alt="Prysm Logo"
              width={41}
              height={41}
              className="h-6 sm:h-7 w-auto"
              src="https://www.prysm.fi/_next/static/media/prysm_logo_1.c68d26ad.svg"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-800 cursor-pointer ml-1">
              Prysm
            </span>
          </div>

          <div className="hidden lg:flex flex-row gap-3 items-center ml-4 xl:ml-6 font-semibold">
            <Link href="/screener" className="hover:text-blue-600 transition-colors">Screener</Link>
            <Link href="/pulse" className="hover:text-blue-600 transition-colors">Pulse</Link>
            <Link href="/discovery" className="hover:text-blue-600 transition-colors">Discovery</Link>
            <Link href="/accounts" className="hover:text-blue-600 transition-colors">Accounts</Link>
            <Link href="/analyze" className="hover:text-blue-600 transition-colors">Analyze</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex lg:hidden gap-1 sm:gap-2">
          <SearchButton />
          <WhatsAppButton />
          <MobileMenuButton />
        </div>

        <div className="hidden lg:flex items-center flex-shrink-0 gap-3 xl:gap-5">
          <WhatsAppButton />
          <SearchBar />
          <button className="border py-2 px-3 rounded-lg border-zinc-300 hover:bg-gray-50 transition-colors">
            Login
          </button>
          <button className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors">
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};


const SearchButton = () => (
  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 rounded-lg text-gray-800 focus:outline-none px-3 py-3">
    <Search className="w-5 h-5" />
  </button>
);

const WhatsAppButton = () => (
  <div className="flex items-center justify-center flex-shrink-0 h-full">
    <Link
      href="https://chat.whatsapp.com/LYwSgfanKGq3eBlf5M04CR"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-1 transition-all duration-200 rounded-md bg-green-500"
    >
      <FaWhatsapp size={`2em`} color='white' />
    </Link>
  </div>
);

const MobileMenuButton = () => (
  <button className="bg-blue-500 p-2 rounded-md">
    <Menu className="w-5 h-5 text-white" />
  </button>
);

const SearchBar = () => (
  <div className="relative flex items-center w-full max-w-xs xl:max-w-sm flex-shrink">
    <div className="relative flex items-center w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        className="flex h-10 border border-zinc-200 px-3 pl-9 pr-12 xl:pr-16 py-1.5 text-sm rounded-md bg-gray-100 w-full"
        placeholder="Search stocks..."
        type="search"
        defaultValue=""
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-0.5 pointer-events-none hidden xl:flex">
        <span className="bg-gray-100 text-gray-700 px-1 rounded text-xs font-mono border border-gray-300">
          Ctrl
        </span>
        <span className="text-xs text-gray-400">+</span>
        <span className="bg-gray-100 text-gray-700 px-1 rounded text-xs font-mono border border-gray-300">
          K
        </span>
      </div>
    </div>
  </div>
);


export default Navbar;