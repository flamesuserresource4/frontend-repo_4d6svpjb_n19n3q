import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import JacketScene from './components/JacketScene'
import Section from './components/Section'
import Spline from '@splinetool/react-spline'

const ORANGE = '#FF6B35'
const BG = '#0D0D0D'

const targets = {
  hero: { rotationY: 0.2, rotationX: 0, scale: 1 },
  shoulder: { rotationY: 0.6, rotationX: 0.15, scale: 1.3 },
  elbow: { rotationY: -0.8, rotationX: -0.1, scale: 1.4 },
  chest: { rotationY: 0, rotationX: 0, scale: 1.5 },
  back: { rotationY: Math.PI, rotationX: 0, scale: 1.5 },
}

export default function App() {
  const [active, setActive] = useState('hero')
  const featuresRef = useRef(null)

  const handleInView = useCallback((id) => {
    setActive(id)
  }, [])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const target = useMemo(() => targets[active] || targets.hero, [active])

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: 'white' }}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Spline 3D cover background */}
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#FFD166] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,107,53,0.6)]"
          >
            ARMOR FOR RIDERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 max-w-2xl text-gray-200/90"
          >
            Advanced protection technology engineered for performance, comfort, and confidence on every ride.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 flex items-center gap-4"
          >
            <button onClick={scrollToFeatures} className="px-6 py-3 rounded-md bg-[#FF6B35] text-black font-semibold shadow-[0_0_24px_rgba(255,107,53,0.6)] hover:brightness-110 transition">
              Explore Protection
            </button>
            <button className="px-6 py-3 rounded-md border border-[#FF6B35] text-white font-semibold hover:bg-white/5 transition">
              Shop Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content + 3D Model layout */}
      <section ref={featuresRef} className="relative w-full">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2">
          {/* Left: sections */}
          <div className="relative">
            <Section
              id="shoulder"
              title="SHOULDER PROTECTION"
              description="CE-certified shoulder armor, impact absorption, foam construction."
              align="left"
              onInView={handleInView}
            />
            <Section
              id="elbow"
              title="ELBOW GUARDS"
              description="Ergonomic design, multi-layer shock absorption, flexible armor plates."
              align="right"
              onInView={handleInView}
            />
            <Section
              id="chest"
              title="CHEST ARMOR"
              description="Reinforced chest plate, ventilation channels, impact-resistant core."
              align="left"
              onInView={handleInView}
            />
            <Section
              id="back"
              title="BACK PROTECTION"
              description="Full-spine protection, articulated segments, military-grade resistance."
              align="right"
              onInView={handleInView}
            />
          </div>

          {/* Right: fixed 3D model on desktop */}
          <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 order-first lg:order-none">
            <div className="absolute inset-0">
              <JacketScene target={target} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#FFD166] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,107,53,0.35)]">
            ARMOR FOR RIDERS
          </div>
          <nav className="flex items-center gap-6 text-gray-300">
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Technology</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </nav>
        </div>
        <p className="text-center text-gray-400 mt-6">Protecting riders with innovative safety technology since 2024</p>
      </footer>
    </div>
  )
}
