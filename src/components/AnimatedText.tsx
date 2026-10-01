import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

const AnimatedText = ({ text, className = '' }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const chars = word.split('')
        return (
          <span key={wi} className="inline-block mr-[0.3em]">
            {chars.map((char, ci) => {
              const totalChars = text.replace(/ /g, '').length
              const charIndex = text.replace(/ /g, '').indexOf(char) !== -1
                ? text.split('').filter((c) => c !== ' ').slice(0, words.slice(0, wi).join('').length + ci + (wi > 0 ? 0 : 0)).length
                : 0

              // Calculate which character this is in the entire string
              let globalIndex = 0
              for (let w = 0; w < wi; w++) {
                globalIndex += words[w].length
              }
              globalIndex += ci

              const start = globalIndex / totalChars
              const end = Math.min(start + 0.1, 1)

              return (
                <CharReveal
                  key={ci}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              )
            })}
          </span>
        )
      })}
    </p>
  )
}

interface CharRevealProps {
  char: string
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}

const CharReveal = ({ char, scrollYProgress, start, end }: CharRevealProps) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  )
}

export default AnimatedText
