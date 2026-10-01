import { ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  href?: string
  target?: string
  rel?: string
}

const MagneticButton = ({ children, className = '', onClick, href, target, rel }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href, target, rel } : {}

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      className="inline-block"
    >
      <Tag
        className={className}
        onClick={onClick}
        {...(linkProps as Record<string, string>)}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

export default MagneticButton
