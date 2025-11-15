import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

function JacketModel({ target, disableControls = true }) {
  const group = useRef()
  const scaleRef = useRef(1)
  // Smoothly interpolate rotation and scale to target
  useFrame((state, delta) => {
    if (!group.current) return
    // Lerp rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target.rotationY, Math.min(1, delta * 3))
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, target.rotationX || 0, Math.min(1, delta * 3))
    // Lerp scale
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target.scale, Math.min(1, delta))
    group.current.scale.setScalar(scaleRef.current)
  })

  const orange = new THREE.Color('#FF6B35')
  const dark = new THREE.Color('#0D0D0D')

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Main torso */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1.2, 0.5]} />
        <meshStandardMaterial color={dark} metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Neck collar */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={'#111'} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-0.8, 0.1, 0]} rotation={[0, 0, Math.PI / 10]}>
        <cylinderGeometry args={[0.18, 0.2, 1.1, 20]} />
        <meshStandardMaterial color={'#141414'} roughness={0.6} />
      </mesh>
      {/* Right sleeve */}
      <mesh position={[0.8, 0.1, 0]} rotation={[0, 0, -Math.PI / 10]}>
        <cylinderGeometry args={[0.18, 0.2, 1.1, 20]} />
        <meshStandardMaterial color={'#141414'} roughness={0.6} />
      </mesh>

      {/* Shoulder pads */}
      <mesh position={[-0.6, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.6, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.2} />
      </mesh>

      {/* Elbow guards */}
      <mesh position={[-0.95, -0.1, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.26]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.95, -0.1, 0]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.26]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.15} />
      </mesh>

      {/* Chest armor */}
      <mesh position={[0, 0.2, 0.26]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.06]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.12} />
      </mesh>

      {/* Back protection */}
      <mesh position={[0, 0.1, -0.27]} castShadow>
        <boxGeometry args={[0.55, 0.9, 0.05]} />
        <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.12} />
      </mesh>
    </group>
  )
}

export default function JacketScene({ target }) {
  return (
    <Canvas shadows camera={{ position: [0, 0.6, 3], fov: 40 }} style={{ width: '100%', height: '100%' }}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 2]} intensity={0.9} castShadow />
      <spotLight position={[-3, 3, 2]} angle={0.3} intensity={0.7} penumbra={0.6} castShadow />
      <pointLight position={[0, 1.5, 1]} intensity={0.6} />

      <JacketModel target={target} />

      {/* Subtle ground to receive shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>

      <Html position={[0, -1.2, 0]}> </Html>
    </Canvas>
  )
}
