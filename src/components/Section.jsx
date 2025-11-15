import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, description, align = 'left', onInView }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.6, margin: '0px' })
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasEntered(true)
      onInView && onInView(id)
    }
  }, [isInView, id, onInView])

  return (
    <section ref={ref} id={id} className="min-h-screen flex items-center">
      <div className={`w-full px-6 md:px-10 lg:px-16 ${align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'} max-w-2xl`}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#FFD166] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,107,53,0.35)]"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-gray-300/90 leading-relaxed text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
