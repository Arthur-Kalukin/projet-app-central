"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg border-r transition-transform duration-200 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:static`}>
        <div className="h-16 flex items-center px-4 border-b">
          <span className="font-semibold">Projet App Central</span>
        </div>
        <nav className="p-3 text-sm space-y-2">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100">Accueil</Link>
          {/* Placeholder : plus tard on pourra conditionner par rôle */}
          {/* {role === 'admin' && <Link ...>Admin</Link>} */}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 md:ml-0">
        <header className="h-16 bg-white border-b flex items-center px-4 sticky top-0 z-30">
          <button className="md:hidden mr-2 rounded border px-2 py-1" onClick={() => setOpen(v => !v)}>
            ☰
          </button>
          <h1 className="font-medium">Accueil</h1>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
