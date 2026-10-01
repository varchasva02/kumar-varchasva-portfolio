import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import {
  Code2, Brain, Sparkles, Database, Wrench,
} from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const categories: SkillCategory[] = [
  {
    title: 'Programming',
    icon: <Code2 size={22} />,
    skills: ['Python', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'AI / ML',
    icon: <Brain size={22} />,
    skills: [
      'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
      'PyTorch', 'TensorFlow', 'Scikit-learn',
    ],
  },
  {
    title: 'Generative AI',
    icon: <Sparkles size={22} />,
    skills: ['LLMs', 'RAG', 'FAISS', 'Sentence Transformers', 'Ollama', 'Embeddings'],
  },
  {
    title: 'Data',
    icon: <Database size={22} />,
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'SQL', 'MySQL', 'PL/SQL'],
  },
  {
    title: 'Development',
    icon: <Wrench size={22} />,
    skills: ['Flask', 'Streamlit', 'React', 'Vercel', 'Git', 'GitHub', 'VS Code'],
  },
]

const SkillCard = ({ skill }: { skill: string }) => (
  <motion.div
    whileHover={{ y: -4, borderColor: 'rgba(122, 35, 53, 0.5)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="px-4 py-3 rounded-xl bg-cream/5 border border-transparent text-primary font-inter text-sm font-medium cursor-default hover:shadow-[0_0_20px_rgba(122,35,53,0.1)] transition-shadow"
  >
    {skill}
  </motion.div>
)

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-cream rounded-t-[40px] md:rounded-t-[60px]"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="mb-4 flex items-center gap-3">
            <span className="w-5 h-[1px] bg-maroon/40" />
            <p className="text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-maroon/70 font-semibold select-none">
              THE ARSENAL
            </p>
          </div>
          <h2 className="font-kanit font-800 text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-primary mb-20">
            Tech Stack
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.1}>
              <div className="bg-white/60 backdrop-blur-sm border border-primary/5 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-maroon/10 text-maroon">
                    {cat.icon}
                  </div>
                  <h3 className="font-kanit font-600 text-lg text-primary uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <SkillCard key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
