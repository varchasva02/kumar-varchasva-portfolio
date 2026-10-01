import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import { Sparkles, Brain, Cpu } from 'lucide-react'

/* ── Animated Neural Network ── */
interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const NeuralVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const nodesRef = useRef<Node[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize nodes
    const count = 45
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)
      const nodes = nodesRef.current
      const mouse = mouseRef.current

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > cw) node.vx *= -1
        if (node.y < 0 || node.y > ch) node.vy *= -1
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.15
            ctx.strokeStyle = `rgba(122, 35, 53, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw mouse connections
      nodes.forEach((node) => {
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const alpha = (1 - dist / 200) * 0.3
          ctx.strokeStyle = `rgba(216, 199, 163, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const glow = dist < 180

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = glow
          ? 'rgba(216, 199, 163, 0.8)'
          : 'rgba(122, 35, 53, 0.5)'
        ctx.fill()

        if (glow) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(216, 199, 163, 0.1)'
          ctx.fill()
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

/* ── Hero Section ── */
const Hero = () => {
  const [, setMousePos] = useState({ x: 0, y: 0 })
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const springX = useSpring(glowX, { stiffness: 50, damping: 30 })
  const springY = useSpring(glowY, { stiffness: 50, damping: 30 })

  // Parallax for portrait
  const portraitShiftX = useMotionValue(0)
  const portraitShiftY = useMotionValue(0)
  const smoothPortraitX = useSpring(portraitShiftX, { stiffness: 40, damping: 20 })
  const smoothPortraitY = useSpring(portraitShiftY, { stiffness: 40, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x: relX * 40, y: relY * 40 })
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    portraitShiftX.set(relX * -25)
    portraitShiftY.set(relY * -25)
  }

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        <NeuralVisual />
      </div>

      {/* Radial glow following mouse */}
      <motion.div
        className="absolute w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(122,35,53,0.14) 0%, rgba(90,22,37,0.06) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient background glows */}
      <div
        className="absolute right-[5%] top-[20%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[120px] opacity-40"
        style={{
          background: 'radial-gradient(circle, #7A2335 0%, #5A1625 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-[15%] bottom-[15%] w-[350px] h-[350px] rounded-full pointer-events-none blur-[100px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #D8C7A3 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column: Typography & CTAs */}
        <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col items-start">
          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-secondary-text mb-6 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AIML Student • Software Developer
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-kanit font-800 leading-[0.92] tracking-tight mb-2"
            style={{ fontSize: 'clamp(3.2rem, 8vw, 8.5rem)' }}
          >
            <span className="bg-gradient-to-r from-cream via-beige to-burgundy bg-clip-text text-transparent">
              Hi, I'm
            </span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-kanit font-900 leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8vw, 8.5rem)' }}
          >
            <span className="bg-gradient-to-r from-beige via-burgundy to-maroon bg-clip-text text-transparent glow-text">
              Varchasva.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-kanit font-300 text-xl md:text-2xl lg:text-3xl text-secondary-text tracking-wide mb-5 max-w-2xl"
          >
            Building intelligent systems, one project at a time.
          </motion.p>

          {/* Easter egg decorative micro-line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-5 h-[1px] bg-beige/25" />
            <span className="text-[10px] font-inter uppercase tracking-[0.35em] text-beige/45 font-medium select-none">
              Beyond the walls.
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-inter text-sm md:text-base text-secondary-text/80 max-w-lg mb-10 leading-relaxed"
          >
            I'm an AIML student building practical applications across machine learning, generative AI, RAG, and software development.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-inter text-sm font-medium uppercase tracking-[0.15em] text-cream bg-gradient-to-r from-maroon to-burgundy hover:from-burgundy hover:to-maroon transition-all duration-500 glow-burgundy cursor-pointer shadow-lg shadow-maroon/30"
              onClick={() => scrollTo('#projects')}
            >
              View My Projects
            </MagneticButton>
            <MagneticButton
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-inter text-sm font-medium uppercase tracking-[0.15em] text-beige border border-beige/30 hover:border-beige/60 hover:bg-beige/5 transition-all duration-500 cursor-pointer"
              onClick={() => scrollTo('#contact')}
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: Floating Animated Photo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full lg:w-[42%] xl:w-[40%] flex justify-center lg:justify-end relative mt-6 lg:mt-0"
        >
          {/* Main Floating Wrapper */}
          <motion.div
            animate={{
              y: [-12, 12, -12],
              rotate: [-0.8, 0.8, -0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
            style={{
              x: smoothPortraitX,
              y: smoothPortraitY,
            }}
            className="relative flex items-center justify-center max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px]"
          >
            {/* Pulsing Cybernetic Aura / Halo Rings behind */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute inset-4 -z-10 rounded-full bg-gradient-to-tr from-maroon via-burgundy to-beige/30 blur-2xl opacity-60"
            />

            {/* Orbiting Rotating Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-beige/20 pointer-events-none -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 36, ease: 'linear' }}
              className="absolute w-[310px] h-[310px] sm:w-[390px] sm:h-[390px] rounded-full border border-dotted border-burgundy/40 pointer-events-none -z-10"
            />

            {/* Cutout Portrait Image */}
            <div className="relative z-10 w-full overflow-hidden flex justify-center">
              <img
                src="/varchasva.png"
                alt="Kumar Varchasva"
                className="w-full max-h-[540px] sm:max-h-[600px] lg:max-h-[640px] object-contain drop-shadow-[0_25px_45px_rgba(90,22,37,0.45)] select-none pointer-events-none"
              />

              {/* Bottom Gradient Fade to smoothly blend into the dark background */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20 pointer-events-none" />
            </div>

            {/* Floating Tech Badge 1: Top Right */}
            <motion.div
              animate={{
                y: [6, -8, 6],
                x: [-3, 3, -3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.8,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="absolute -top-3 -right-2 sm:-right-4 z-30 card-glass px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-beige/20 shadow-2xl backdrop-blur-md"
            >
              <div className="p-1.5 rounded-lg bg-burgundy/30 text-cream">
                <Brain size={15} className="text-beige" />
              </div>
              <div>
                <p className="text-[9px] font-inter uppercase tracking-[0.2em] text-secondary-text">Focus</p>
                <p className="text-xs font-kanit font-600 text-cream tracking-wide">AI & Deep Learning</p>
              </div>
            </motion.div>

            {/* Floating Tech Badge 2: Bottom Left */}
            <motion.div
              animate={{
                y: [-8, 6, -8],
                x: [3, -3, 3],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.2,
                ease: 'easeInOut',
                delay: 0.9,
              }}
              className="absolute bottom-6 -left-3 sm:-left-6 z-30 card-glass px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-burgundy/30 shadow-2xl backdrop-blur-md"
            >
              <div className="p-1.5 rounded-lg bg-beige/10 text-beige">
                <Cpu size={15} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <p className="text-[9px] font-inter uppercase tracking-[0.2em] text-secondary-text">Status</p>
                </div>
                <p className="text-xs font-kanit font-600 text-cream tracking-wide">Building RAG & Systems</p>
              </div>
            </motion.div>

            {/* Floating Tech Badge 3: Subtle Micro Accent */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 -right-6 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-maroon/30 border border-burgundy/40 backdrop-blur-sm text-[10px] font-inter text-beige"
            >
              <Sparkles size={11} className="text-beige animate-spin" style={{ animationDuration: '8s' }} />
              <span>PyTorch • LLMs</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-inter uppercase tracking-[0.3em] text-secondary-text/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-beige/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default Hero

