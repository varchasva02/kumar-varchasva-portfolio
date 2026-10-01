const techRow1 = [
  'PYTHON', 'C++', 'JAVA', 'MACHINE LEARNING', 'DEEP LEARNING',
  'PYTORCH', 'TENSORFLOW', 'RAG', 'LLM', 'FAISS',
]

const techRow2 = [
  'SQL', 'FLASK', 'STREAMLIT', 'REACT', 'JAVASCRIPT',
  'GIT', 'GITHUB', 'NLP', 'COMPUTER VISION', 'PANDAS',
]

const Separator = () => (
  <span className="inline-block w-2 h-2 rounded-full bg-burgundy/60 mx-6 flex-shrink-0" />
)

const MarqueeRow = ({
  items,
  direction,
}: {
  items: string[]
  direction: 'left' | 'right'
}) => {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div
        className={`inline-flex items-center ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((tech, i) => (
          <span key={`${tech}-${i}`} className="inline-flex items-center">
            <span className="font-kanit font-700 text-3xl md:text-5xl lg:text-6xl tracking-tight text-primary-text/10 hover:text-beige/40 transition-colors duration-500 cursor-default">
              {tech}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  )
}

const TechMarquee = () => {
  return (
    <section className="py-8 md:py-16 overflow-hidden border-t border-b border-primary-text/5">
      <MarqueeRow items={techRow1} direction="right" />
      <MarqueeRow items={techRow2} direction="left" />
    </section>
  )
}

export default TechMarquee
