import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import MagneticButton from '../components/MagneticButton'
import { Mail, Github, Linkedin, Check } from 'lucide-react'

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [, setMouse] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const springX = useSpring(glowX, { stiffness: 30, damping: 25 })
  const springY = useSpring(glowY, { stiffness: 30, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  const handleEmailClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('takvishu33@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Decorative KV */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-kanit font-900 text-[30vw] md:text-[25vw] text-primary-text/[0.02] leading-none">
          KV
        </span>
      </div>

      {/* Mouse glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(122,35,53,0.1) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <FadeIn>
          <h2 className="font-kanit font-800 text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-cream mb-8">
            Let's Build Something.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-inter text-base md:text-lg text-secondary-text mb-5 max-w-lg mx-auto leading-relaxed">
            Have an idea, project, internship opportunity, or something
            interesting to build?
          </p>
          <p className="text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-beige/40 mb-12 font-medium select-none">
            There's always another wall to break.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              onClick={handleEmailClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-inter text-sm font-medium uppercase tracking-[0.15em] text-cream bg-gradient-to-r from-maroon to-burgundy hover:from-burgundy hover:to-maroon transition-all duration-500 glow-burgundy cursor-pointer select-none"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-cream" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Email Me
                </>
              )}
            </MagneticButton>

            <MagneticButton
              href="https://github.com/varchasva02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-inter text-sm font-medium uppercase tracking-[0.15em] text-beige border border-beige/25 hover:border-beige/50 hover:bg-beige/5 transition-all duration-500"
            >
              <Github size={16} />
              GitHub
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/varchasva-tak-aa5b5031a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-inter text-sm font-medium uppercase tracking-[0.15em] text-beige border border-beige/25 hover:border-beige/50 hover:bg-beige/5 transition-all duration-500"
            >
              <Linkedin size={16} />
              LinkedIn
            </MagneticButton>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-inter text-secondary-text/60">
            <span>Or write directly to:</span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=takvishu33@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-beige hover:text-cream underline underline-offset-4 transition-colors font-medium"
            >
              takvishu33@gmail.com
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Contact
