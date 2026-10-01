import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-beige/6 py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-secondary-text/50">
        <span className="font-kanit font-500 text-sm tracking-wider uppercase">
          Kumar Varchasva
        </span>

        <span className="text-[10px] font-inter uppercase tracking-[0.35em]">
          AIML • Software • AI
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/varchasva02"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/varchasva-tak-aa5b5031a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:takvishu33@gmail.com"
            className="hover:text-cream transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <span className="text-[10px] font-inter uppercase tracking-[0.2em]">
            © 2026 Kumar Varchasva
          </span>
        </div>
      </div>

      {/* Hidden Easter Egg */}
      <div className="mt-8 pt-4 border-t border-beige/[0.03] text-center">
        <span className="text-[9px] font-inter uppercase tracking-[0.45em] text-secondary-text/20 hover:text-beige/60 transition-colors duration-500 cursor-default select-none">
          SHINZOU WO SASAGEYO.
        </span>
      </div>
    </footer>
  )
}

export default Footer
