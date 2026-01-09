import { GraduationCap, Github, Linkedin, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/constants";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">FastConnect</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Built with ❤️ by FAST-NUCES Students
          </p>
        </div>
      </div>
    </footer>
  );
}
