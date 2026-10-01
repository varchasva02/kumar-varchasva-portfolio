import AnimatedText from '../components/AnimatedText'
import FadeIn from '../components/FadeIn'
import { Brain, Database, Terminal, Code2, Cpu, Binary } from 'lucide-react'
import { motion } from 'framer-motion'

const floatingIcons = [
  { Icon: Brain, top: '10%', left: '5%', delay: 0 },
  { Icon: Database, top: '20%', right: '8%', delay: 0.5 },
  { Icon: Terminal, bottom: '25%', left: '8%', delay: 1 },
  { Icon: Code2, top: '15%', right: '15%', delay: 1.5 },
  { Icon: Cpu, bottom: '15%', right: '5%', delay: 2 },
  { Icon: Binary, top: '50%', left: '3%', delay: 0.8 },
]

const About = () => {
  return (
    <section id="about" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, ...pos }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.06 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5, duration: 1 }}
          className="absolute hidden lg:block"
          style={pos as React.CSSProperties}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 + i, ease: 'easeInOut' }}
          >
            <Icon size={48} className="text-beige" />
          </motion.div>
        </motion.div>
      ))}

      <div className="max-w-[900px] mx-auto">
        <FadeIn>
          <h2 className="font-kanit font-800 text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight text-center mb-20 text-primary-text/10">
            About Me
          </h2>
        </FadeIn>

        <div className="space-y-8">
          <AnimatedText
            text="I'm Kumar Varchasva, an AIML student who enjoys turning concepts into practical software. My interests span machine learning, deep learning, generative AI, RAG systems, and full-stack development."
            className="font-inter text-xl md:text-2xl lg:text-3xl leading-relaxed text-primary-text font-300"
          />

          <AnimatedText
            text="I like learning by building — from prediction models and recommendation systems to AI assistants and web applications."
            className="font-inter text-xl md:text-2xl lg:text-3xl leading-relaxed text-primary-text font-300"
          />

          <AnimatedText
            text="Currently, I'm focused on strengthening my foundations in Python, machine learning, deep learning, PyTorch, and modern AI systems while building projects that solve practical problems."
            className="font-inter text-xl md:text-2xl lg:text-3xl leading-relaxed text-primary-text font-300"
          />
        </div>

        {/* Subtle Editorial Easter Egg Quote */}
        <FadeIn delay={0.3}>
          <div className="mt-20 pt-10 border-t border-primary-text/5 text-center">
            <p className="font-inter italic text-xs md:text-sm tracking-[0.2em] text-secondary-text/35 uppercase select-none">
              "The world is cruel, but it is also very beautiful."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default About
