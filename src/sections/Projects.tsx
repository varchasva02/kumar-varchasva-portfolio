import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { ExternalLink, Github, FileText, Eye, Film, BarChart3, Home, Shield, Mail, ShoppingBag } from 'lucide-react'

interface Project {
  number: string
  category: string
  title: string
  description: string
  features: string[]
  technologies: string[]
  github?: string
  live?: string
  icon: React.ReactNode
  gradient: string
  isFeatured?: boolean
}

const featuredProjects: Project[] = [
  {
    number: '01',
    category: 'GENERATIVE AI',
    title: 'PDF RAG Assistant',
    description:
      'A Flask-based RAG pipeline that extracts and chunks PDF content, generates Sentence Transformer embeddings, stores them in FAISS, and retrieves relevant context for LLM-powered answers.',
    features: [
      'PDF upload & document chunking',
      'Semantic search with embeddings',
      'FAISS vector store',
      'LLM-based answer generation',
      'Contextual question answering',
    ],
    technologies: ['Python', 'Flask', 'Sentence Transformers', 'FAISS', 'Ollama', 'RAG'],
    icon: <FileText size={32} />,
    gradient: 'from-burgundy/20 to-maroon/10',
    isFeatured: true,
  },
  {
    number: '02',
    category: 'COMPUTER VISION / GENERATIVE AI',
    title: 'Vision AI Assistant',
    description:
      'An AI vision assistant that accepts images and user questions, processes visual information with a vision-capable LLM, and returns contextual responses through an interactive Flask interface.',
    features: [
      'Image upload & preview',
      'Visual question answering',
      'AI-generated responses',
      'Interactive chat interface',
    ],
    technologies: ['Python', 'Flask', 'JavaScript', 'Ollama', 'Vision LLM'],
    icon: <Eye size={32} />,
    gradient: 'from-maroon/20 to-burgundy/10',
    isFeatured: true,
  },
  {
    number: '03',
    category: 'MACHINE LEARNING',
    title: 'Movie Recommendation System',
    description:
      'A content-based movie recommendation system that uses movie metadata and similarity techniques to recommend movies through a Streamlit interface.',
    features: [
      'Content-based filtering',
      'Feature similarity matching',
      'TMDB API integration',
      'Interactive Streamlit UI',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'TMDB API'],
    github: 'https://github.com/varchasva02/movie-recommendation-system',
    live: 'https://movie-recommendation-system-lknhvdju4agg3wnzzpastt.streamlit.app/',
    icon: <Film size={32} />,
    gradient: 'from-burgundy/15 to-maroon/10',
    isFeatured: true,
  },
]

const moreProjects: Project[] = [
  {
    number: '04',
    category: 'MACHINE LEARNING',
    title: 'Loan Approval Prediction',
    description:
      'A classification-based machine learning application that predicts loan approval using Decision Tree and Random Forest models through an interactive Streamlit interface.',
    features: [
      'Decision Tree classifier',
      'Random Forest classifier',
      'Model comparison',
      'Streamlit prediction UI',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Decision Tree', 'Random Forest', 'Streamlit'],
    icon: <BarChart3 size={32} />,
    gradient: 'from-maroon/15 to-burgundy/10',
  },
  {
    number: '05',
    category: 'MACHINE LEARNING',
    title: 'House Price Prediction',
    description:
      'A machine learning model that predicts house prices from property-related features using a structured data preprocessing and regression workflow.',
    features: [
      'Feature engineering',
      'Regression modeling',
      'Data preprocessing',
      'Performance evaluation',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/varchasva02/house-price-prediction',
    icon: <Home size={32} />,
    gradient: 'from-burgundy/15 to-maroon/10',
  },
  {
    number: '06',
    category: 'NLP / MACHINE LEARNING',
    title: 'Spam Classifier',
    description:
      'An NLP-based text classification system that analyzes message content and predicts whether a message is spam or legitimate.',
    features: [
      'Text preprocessing',
      'NLP feature extraction',
      'Binary classification',
      'Message scoring',
    ],
    technologies: ['Python', 'NLP', 'Text Classification', 'Machine Learning'],
    icon: <Mail size={32} />,
    gradient: 'from-maroon/15 to-burgundy/10',
  },
  {
    number: '07',
    category: 'FULL STACK / E-COMMERCE',
    title: 'KicksCulture',
    description:
      'A responsive sneaker e-commerce website focused on product presentation, clean UI, and a modern shopping experience.',
    features: [
      'Product showcase',
      'Responsive design',
      'Clean UI/UX',
      'Interactive product pages',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    live: 'https://kicksculture.vercel.app/',
    icon: <ShoppingBag size={32} />,
    gradient: 'from-burgundy/15 to-maroon/10',
  },
]

/* ── Single Sticky Project Card ── */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6])

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        willChange: 'transform',
      }}
      className="sticky top-20 mb-8"
    >
      <div
        className={`card-glass rounded-[40px] md:rounded-[50px] overflow-hidden border border-beige/8`}
        style={{ top: `${80 + index * 12}px` }}
      >
        <div className="p-8 md:p-12 lg:p-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-10">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                <span className="font-kanit font-800 text-5xl md:text-7xl text-burgundy/20">
                  {project.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-beige/40 px-3 py-1 bg-beige/[0.03] border border-beige/10 rounded-full select-none">
                  EXPEDITION {project.number}
                </span>
                <span className="text-[10px] font-inter uppercase tracking-[0.3em] text-secondary-text px-3 py-1 border border-secondary-text/15 rounded-full">
                  {project.category}
                </span>
                {project.isFeatured && (
                  <span className="text-[10px] font-inter uppercase tracking-[0.25em] text-cream bg-burgundy/25 border border-burgundy/40 px-3 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-kanit font-700 text-3xl md:text-4xl lg:text-5xl text-cream mb-4 tracking-tight">
                {project.title}
              </h3>

              <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed max-w-xl">
                {project.description}
              </p>
            </div>

            {/* Icon Visual */}
            <div
              className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center border border-beige/8 flex-shrink-0`}
            >
              <div className="text-beige/40">{project.icon}</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {project.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-burgundy mt-2 flex-shrink-0" />
                <span className="font-inter text-sm text-primary-text/60">{feat}</span>
              </div>
            ))}
          </div>

          {/* Bottom bar: tech tags + buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-beige/6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-[10px] font-inter font-medium uppercase tracking-wider bg-beige/5 text-beige/60 border border-beige/8"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-inter font-medium uppercase tracking-wider text-cream border border-beige/15 hover:border-beige/40 hover:bg-beige/5 transition-all"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={14} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-inter font-medium uppercase tracking-wider text-cream bg-gradient-to-r from-maroon to-burgundy hover:from-burgundy hover:to-maroon transition-all glow-burgundy"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={14} />
                  Live Project
                </a>
              )}
              {!project.github && !project.live && (
                <Shield size={16} className="text-secondary-text/30" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Projects Section ── */
const Projects = () => {
  return (
    <section id="projects" className="py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <div className="mb-4 flex items-center gap-3">
            <span className="w-5 h-[1px] bg-burgundy/50" />
            <p className="text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-beige/50 font-medium select-none">
              SCOUT REPORT // PROJECTS
            </p>
          </div>
          <h2 className="font-kanit font-800 text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-primary-text mb-16">
            Selected Projects
          </h2>
        </FadeIn>

        {/* Featured Projects */}
        <div className="mb-20">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
              <h3 className="text-xs md:text-sm font-inter uppercase tracking-[0.3em] text-beige/90 font-semibold">
                Featured Projects
              </h3>
              <span className="flex-1 h-[1px] bg-beige/10 ml-2" />
            </div>
          </FadeIn>

          <div className="space-y-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.number} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* More Projects */}
        <div>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-10 pt-4">
              <span className="w-2 h-2 rounded-full bg-secondary-text/50" />
              <h3 className="text-xs md:text-sm font-inter uppercase tracking-[0.3em] text-secondary-text font-semibold">
                More Projects
              </h3>
              <span className="flex-1 h-[1px] bg-beige/10 ml-2" />
            </div>
          </FadeIn>

          <div className="space-y-6">
            {moreProjects.map((project, i) => (
              <ProjectCard key={project.number} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
