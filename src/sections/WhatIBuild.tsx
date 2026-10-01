import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { Brain, Sparkles, Code2, BarChart3 } from 'lucide-react'

interface WorkCategory {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  keywords: string[]
}

const workCategories: WorkCategory[] = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: <Brain size={28} />,
    description:
      'Prediction models, recommendation systems, classification, feature engineering.',
    keywords: ['Supervised Learning', 'Classification', 'Regression', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    id: 'genai',
    title: 'Generative AI',
    icon: <Sparkles size={28} />,
    description:
      'LLMs, RAG pipelines, embeddings, vector databases, document intelligence.',
    keywords: ['LLMs', 'RAG', 'Embeddings', 'Vector Search', 'Document AI'],
  },
  {
    id: 'software',
    title: 'Software',
    icon: <Code2 size={28} />,
    description:
      'Web applications, APIs, interactive dashboards, and practical developer tools.',
    keywords: ['Web Apps', 'REST APIs', 'Dashboards', 'Full Stack', 'UI/UX'],
  },
  {
    id: 'data',
    title: 'Data',
    icon: <BarChart3 size={28} />,
    description:
      'EDA, preprocessing, visualization, statistical analysis, and extracting insights from datasets.',
    keywords: ['EDA', 'Visualization', 'Preprocessing', 'Statistics', 'Insights'],
  },
]

const WhatIBuild = () => {
  const [active, setActive] = useState<string>('ai')

  const activeCategory = workCategories.find((c) => c.id === active)!

  return (
    <section className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-primary">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <h2 className="font-kanit font-800 text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-primary-text mb-20">
            What I Like Building
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Categories */}
          <div className="space-y-3">
            {workCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 ${
                  active === cat.id
                    ? 'bg-burgundy/10 border-burgundy/30'
                    : 'bg-transparent border-beige/6 hover:border-beige/15'
                }`}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      active === cat.id
                        ? 'bg-burgundy/20 text-cream'
                        : 'bg-beige/5 text-secondary-text'
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-kanit font-600 text-lg md:text-xl text-cream">
                    {cat.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active Detail */}
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="card-glass rounded-3xl p-10 w-full"
              >
                <div className="text-burgundy mb-6">{activeCategory.icon}</div>
                <h3 className="font-kanit font-700 text-2xl md:text-3xl text-cream mb-4">
                  {activeCategory.title}
                </h3>
                <p className="font-inter text-base text-secondary-text leading-relaxed mb-8">
                  {activeCategory.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1.5 rounded-full text-[10px] font-inter font-medium uppercase tracking-wider bg-burgundy/8 text-beige/60 border border-burgundy/12"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIBuild
