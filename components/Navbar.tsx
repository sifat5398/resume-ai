"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, Upload, Zap, Menu, X, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-base/80 backdrop-blur-md border-bg-border py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-accent fill-accent" />
            <span className="text-xl font-bold tracking-tight text-text-primary">
              Resume<span className="text-accent">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {!session && (
              <>
                <Link href="/#features" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">Features</Link>
                <Link href="/#how-it-works" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">How it works</Link>
              </>
            )}
            
            {session ? (
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/upload" className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
                  <Upload className="h-4 w-4" />
                  New Review
                </Link>
                <div className="h-4 w-px bg-bg-border" />
                
                <div className="relative group/user">
                  <button className="flex items-center gap-3 py-1 outline-none">
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={session.user.image} alt="" className="h-8 w-8 rounded-full border border-bg-border" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-surface border border-bg-border flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-text-muted" />
                      </div>
                    )}
                  </button>
                  
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200">
                    <div className="w-48 bg-surface border border-bg-border rounded-xl shadow-2xl p-1 overflow-hidden">
                      <div className="px-3 py-2 border-b border-bg-border mb-1">
                        <p className="text-xs font-medium text-text-primary truncate">{session.user?.name || session.user?.email}</p>
                      </div>
                      <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn(
        "fixed inset-0 top-[73px] bg-base z-40 md:hidden transition-transform duration-300",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-6 gap-6">
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-text-primary">Dashboard</Link>
              <Link href="/upload" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-text-primary">New Review</Link>
              <button onClick={() => signOut()} className="text-lg font-medium text-danger text-left">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/#features" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-text-primary">Features</Link>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-accent">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
