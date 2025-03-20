
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analysis", path: "/analysis" },
    { name: "Interventions", path: "/interventions" },
    { name: "Date Night", path: "/date-night" },
    { name: "Progress", path: "/progress" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-tight flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary font-medium text-xl"
          aria-label="Couple Coach"
        >
          <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center text-white">
            CC
          </div>
          <span className="hidden sm:inline-block">Couple Coach</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path)
                  ? "text-primary"
                  : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login/Sign Up Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth?mode=login" className="text-sm font-medium text-foreground/70 hover:text-primary">
            Login
          </Link>
          <Link
            to="/auth?mode=signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-primary/10 hover:text-primary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in-down">
          <div className="space-y-1 pt-2 pb-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block py-2 px-3 text-base font-medium rounded-md",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-4 pt-4 flex flex-col space-y-3">
              <Link 
                to="/auth?mode=login" 
                className="block py-2 px-3 text-base font-medium rounded-md text-foreground/70 hover:bg-primary/5 hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/auth?mode=signup"
                className="block py-2 px-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
