import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';
import { ModeToggle } from './modes';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            YTrimmer
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="hover:opacity-80">
            <UserCircle2 className="h-6 w-6" />
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
