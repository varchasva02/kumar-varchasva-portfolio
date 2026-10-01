import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { Zap } from 'lucide-react'

const topics = [
  'PyTorch',
  'Deep Learning',
  'Transformers',
  'LLM Applications',
  'Advanced RAG',
  'Computer Vision',
  'NLP',
  'AI Agents',
]

const CurrentlyLearning = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-beige/5">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-burgundy/10">
                <Zap size={18} className="text-burgundy" />
              </div>
              <h2 className="font-kanit font-700 text-2xl md:text-3xl uppercase tracking-wider text-cream">
                Currently Exploring
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-beige/45 font-medium select-none"
            >
              Keep moving forward.
            </motion.p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap gap-3">
          {topics.map((topic, i) => (
            <FadeIn key={topic} delay={i * 0.05}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(122, 35, 53, 0.5)',
                }}
                className="px-6 py-3 rounded-2xl border border-beige/10 bg-beige/[0.03] font-inter text-sm md:text-base text-beige/70 cursor-default hover:text-cream hover:bg-burgundy/10 transition-colors duration-300"
              >
                {topic}
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Roadmap line */}
        <FadeIn delay={0.3}>
          <div className="mt-12 flex items-center gap-3 text-secondary-text/30">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-burgundy/20 to-transparent" />
            <span className="text-[10px] font-inter uppercase tracking-[0.3em]">
              Building continuously
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-burgundy/20 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default CurrentlyLearning
