import { BookOpen } from "lucide-react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";

function FooterLink({
  href,
  children,
}: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="hover:text-white transition-colors">
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">SkillPath</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Empowering students to navigate their career journey with
              confidence.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <FooterLink href="/">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Blog</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Press</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <FooterLink href="/assess">Skill Assessment</FooterLink>
              </li>
              <li>
                <FooterLink href="/dashboard">Job Matching</FooterLink>
              </li>
              <li>
                <FooterLink href="/dashboard">Roadmaps</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Mentorship</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <FooterLink href="/">Documentation</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Tutorials</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Community</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Support</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <FooterLink href="/">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink href="/">Cookie Policy</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-white/50">
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              className="text-white/70 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
