
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AISettings from "./AISettings";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              TalkBetter
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/how-it-works"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/how-it-works"
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              How It Works
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analysis"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/analysis"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Analysis
                </Link>
                <Link
                  to="/interventions"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/interventions"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Interventions
                </Link>
                <Link
                  to="/date-night"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/date-night"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Date Night
                </Link>
                <Link
                  to="/progress"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/progress"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Progress
                </Link>
                <Link
                  to="/daily-check-in"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/daily-check-in"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  Daily Check-in
                </Link>
                <div className="ml-2">
                  <AISettings />
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary"
                >
                  Log in
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="ml-2 btn-primary"
                >
                  Sign up
                </Link>
                <div className="ml-2">
                  <AISettings />
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <AISettings />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:bg-primary/10 hover:text-primary focus:outline-none"
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
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/how-it-works"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/how-it-works"
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analysis"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/analysis"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analysis
                </Link>
                <Link
                  to="/interventions"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/interventions"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Interventions
                </Link>
                <Link
                  to="/date-night"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/date-night"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Date Night
                </Link>
                <Link
                  to="/progress"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/progress"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Progress
                </Link>
                <Link
                  to="/daily-check-in"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/daily-check-in"
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daily Check-in
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10 hover:bg-primary/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
