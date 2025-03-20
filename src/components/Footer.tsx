
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 md:py-16">
      <div className="container-tight">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary font-medium text-xl"
              aria-label="Couple Coach"
            >
              <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center text-white">
                CC
              </div>
              <span>Couple Coach</span>
            </Link>
            <p className="mt-4 text-sm text-foreground/70 max-w-xs">
              Transforming relationships through better communication and deeper understanding.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/analysis" className="text-sm text-foreground/70 hover:text-primary">
                  Communication Analysis
                </Link>
              </li>
              <li>
                <Link to="/interventions" className="text-sm text-foreground/70 hover:text-primary">
                  Intervention Plans
                </Link>
              </li>
              <li>
                <Link to="/date-night" className="text-sm text-foreground/70 hover:text-primary">
                  Date Night Generator
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-sm text-foreground/70 hover:text-primary">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/70">
            &copy; {currentYear} Couple Coach. All rights reserved.
          </p>
          <p className="text-sm text-foreground/70 mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-love-500" /> for better relationships
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
