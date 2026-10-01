import FadeIn from '../components/FadeIn'
import { Briefcase } from 'lucide-react'

const Experience = () => {
  return (
    <section id="experience" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-primary">
      <div className="max-w-[1000px] mx-auto">
        <FadeIn>
          <h2 className="font-kanit font-800 text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-primary-text mb-20">
            Experience
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-burgundy/60 via-burgundy/20 to-transparent" />

          {/* Card */}
          <FadeIn delay={0.15} x={0} y={40}>
            <div className="relative pl-16 md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-[18px] md:left-[26px] top-8 w-4 h-4 rounded-full bg-burgundy border-4 border-primary z-10" />

              <div className="card-glass rounded-3xl p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-wrap items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-burgundy/10">
                    <Briefcase size={20} className="text-burgundy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-secondary-text mb-1">
                      Experience 01
                    </p>
                    <h3 className="font-kanit font-700 text-xl md:text-2xl text-cream">
                      AI / ML Intern
                    </h3>
                    <p className="font-inter text-sm text-beige/80 mt-1">
                      Data Ingenious Global Pvt Ltd
                    </p>
                    <p className="font-inter text-xs text-secondary-text/60 mt-1">
                      SummerXcellence Internship 2026
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-inter text-sm md:text-base text-secondary-text leading-relaxed mb-6">
                  Worked on practical AI/ML-oriented projects involving
                  document-based question answering and computer vision /
                  vision-language workflows.
                </p>

                {/* Projects */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-2 flex-shrink-0" />
                    <span className="font-inter text-sm text-primary-text/80">
                      PDF RAG Assistant — AI-powered document question answering
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-2 flex-shrink-0" />
                    <span className="font-inter text-sm text-primary-text/80">
                      Vision AI Assistant — Image analysis and visual QA
                    </span>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python', 'Flask', 'FAISS', 'Sentence Transformers',
                    'Ollama', 'LLMs', 'RAG',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full text-[11px] font-inter font-medium uppercase tracking-wider bg-burgundy/10 text-beige/80 border border-burgundy/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default Experience
