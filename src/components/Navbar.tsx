
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold gradient-text">RelateWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/how-it-works"
            className={cn(
              "px-3 py-2 text-sm rounded-md transition-colors",
              isActive("/how-it-works")
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "px-3 py-2 text-sm rounded-md transition-colors",
              isActive("/pricing")
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            Pricing
          </Link>
          <div className="pl-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <span className="mr-1">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth?mode=login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[57px] bg-background z-40 md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container py-8 flex flex-col space-y-4">
          <Link
            to="/how-it-works"
            className={cn(
              "px-4 py-3 rounded-md transition-colors",
              isActive("/how-it-works")
                ? "bg-accent text-primary font-medium"
                : "text-foreground hover:bg-accent"
            )}
            onClick={closeMenu}
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "px-4 py-3 rounded-md transition-colors",
              isActive("/pricing")
                ? "bg-accent text-primary font-medium"
                : "text-foreground hover:bg-accent"
            )}
            onClick={closeMenu}
          >
            Pricing
          </Link>
          {user ? (
            <>
              <div className="h-px bg-border my-2"></div>
              <Link
                to="/dashboard"
                className={cn(
                  "px-4 py-3 rounded-md transition-colors",
                  isActive("/dashboard")
                    ? "bg-accent text-primary font-medium"
                    : "text-foreground hover:bg-accent"
                )}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/account"
                className={cn(
                  "px-4 py-3 rounded-md transition-colors",
                  isActive("/account")
                    ? "bg-accent text-primary font-medium"
                    : "text-foreground hover:bg-accent"
                )}
                onClick={closeMenu}
              >
                Account Settings
              </Link>
              <button
                className="px-4 py-3 text-left rounded-md text-foreground hover:bg-accent transition-colors"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-border my-2"></div>
              <Link
                to="/auth?mode=login"
                className="px-4 py-3 rounded-md text-foreground hover:bg-accent transition-colors"
                onClick={closeMenu}
              >
                Log In
              </Link>
              <Link
                to="/auth?mode=signup"
                className="px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
