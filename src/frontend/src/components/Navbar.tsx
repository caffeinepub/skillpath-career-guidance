import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground no-underline"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">SkillPath</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/assess"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.assess_link"
          >
            Assess Skills
          </Link>
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.dashboard_link"
          >
            Job Matches
          </Link>
          <a
            href="/#roadmaps"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Learning Roadmaps
          </a>
          <a
            href="/#how-it-works"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Mentorship
          </a>
        </nav>

        {/* Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="nav.dashboard_button"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="nav.logout_button"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                data-ocid="nav.login_button"
              >
                {isLoggingIn ? "Connecting..." : "Log In"}
              </Button>
              <Link to="/assess">
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                  data-ocid="nav.signup_button"
                >
                  Sign Up Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4">
          <Link
            to="/assess"
            className="text-sm font-medium text-muted-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Assess Skills
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium text-muted-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Job Matches
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="nav.mobile_logout_button"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  data-ocid="nav.mobile_login_button"
                >
                  {isLoggingIn ? "Connecting..." : "Log In"}
                </Button>
                <Link to="/assess" onClick={() => setMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-primary text-white"
                    data-ocid="nav.mobile_signup_button"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
