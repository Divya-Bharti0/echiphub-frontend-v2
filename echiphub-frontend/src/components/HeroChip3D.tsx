import { Float, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useDeviceTier } from '../hooks/useDeviceTier'

function ChipCore() {
  const meshRef = useRef<THREE.Group>(null)
  const circuitLinesRef = useRef<THREE.LineSegments>(null)
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ color: '#081120', metalness: 0.85, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: '#0e223d', metalness: 0.95, roughness: 0.15, emissive: '#0284c7', emissiveIntensity: 0.18 }),
    new THREE.MeshStandardMaterial({ color: '#38bdf8', metalness: 0.9, roughness: 0.2, emissive: '#0284c7', emissiveIntensity: 0.4 }),
  ], [])

  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = -1.4; i <= 1.4; i += 0.2) {
      points.push(new THREE.Vector3(i, 0.12, -1.4), new THREE.Vector3(i, 0.12, Math.sin(i * 4) * 0.4))
      points.push(new THREE.Vector3(-1.4, 0.12, i), new THREE.Vector3(Math.cos(i * 4) * 0.4, 0.12, i))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.6 }), [])
  const pinPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const count = 12
    const spacing = 0.28
    const offset = ((count - 1) * spacing) / 2
    for (let i = 0; i < count; i++) {
      const pos = i * spacing - offset
      positions.push([pos, -0.02, 1.85], [pos, -0.02, -1.85], [1.85, -0.02, pos], [-1.85, -0.02, pos])
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current) meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15
    if (circuitLinesRef.current) lineMaterial.opacity = 0.4 + Math.sin(t * 2) * 0.25
  })

  return (
    <group ref={meshRef}>
      <mesh material={materials[0]} castShadow receiveShadow><boxGeometry args={[3.6, 0.12, 3.6]} /></mesh>
      <mesh position={[0, 0.1, 0]} material={materials[1]} castShadow><boxGeometry args={[2.2, 0.1, 2.2]} /></mesh>
      <lineSegments ref={circuitLinesRef} geometry={lineGeometry} material={lineMaterial} />
      <mesh position={[0, 0.16, 0]}><boxGeometry args={[1, 0.04, 1]} /><meshStandardMaterial color="#0369a1" metalness={0.9} roughness={0.1} emissive="#38bdf8" emissiveIntensity={0.6} /></mesh>
      {pinPositions.map((position, index) => <mesh key={index} position={position} material={materials[2]} castShadow><boxGeometry args={[0.12, 0.06, 0.22]} /></mesh>)}
    </group>
  )
}

function FloatingDataParticles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => Array.from({ length: count }, () => ({
    position: new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 6),
    speed: 0.2 + Math.random() * 0.6,
    scale: 0.04 + Math.random() * 0.06,
  })), [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!meshRef.current) return
    particles.forEach((particle, index) => {
      dummy.position.set(particle.position.x, particle.position.y + Math.sin(t * particle.speed + index) * 0.3, particle.position.z)
      dummy.scale.setScalar(particle.scale * (1 + Math.sin(t * 3 + index) * 0.3))
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(index, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[undefined, undefined, count]}><sphereGeometry args={[1, 8, 8]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.65} /></instancedMesh>
}

export function HeroChip3D() {
  const { isLow, reduced, isStatic } = useDeviceTier()
  if (isStatic) {
    return <div className="hero-chip-static" role="img" aria-label="eChipHub semiconductor chip visualization"><div className="hero-chip-static-core">eChipHub</div><div className="hero-chip-static-traces" /></div>
  }

  const particleCount = isLow ? 10 : 28
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden="true">
      <div className="absolute rounded-full pointer-events-none w-[min(72%,420px)] aspect-square bg-[radial-gradient(circle,rgba(41,171,226,.22)_0%,rgba(34,84,196,.08)_55%,transparent_80%)] blur-3xl" />
      <div className="relative w-full h-full">
        <Canvas
          camera={{ position: [0, 3.2, 5.2], fov: 42 }}
          dpr={isLow ? [1, 1] : [1, 1.5]}
          gl={{ antialias: !isLow, alpha: true, powerPreference: 'high-performance' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 4]} intensity={1.8} />
          <pointLight position={[-4, 2, -2]} intensity={1.2} color="#0284c7" />
          <pointLight position={[0, 1.5, 0]} intensity={2} color="#38bdf8" distance={4} />
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}><group rotation={[0.42, 0.35, 0]}><ChipCore /></group></Float>
          <FloatingDataParticles count={particleCount} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced} autoRotateSpeed={0.35} minPolarAngle={Math.PI * 0.32} maxPolarAngle={Math.PI * 0.65} />
        </Canvas>
      </div>
    </div>
  )
}

export default HeroChip3D
