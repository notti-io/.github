import { MeshReflectorMaterial } from '@react-three/drei'
import type { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import Controls from '@/api/Controls'

const controls = Controls.folder('World', 'Floor', {
  color: Controls.color('#202020'),
  blurWidth: Controls.num(1000, 0, 2000, 1),
  blurHeight: Controls.num(1000, 0, 2000, 1),
  mixBlur: Controls.num(1),
  mixStrength: Controls.num(50, 0, 1000),
  resolution: Controls.select(1024, [128, 256, 512, 1024, 2048, 4096]),
  mirror: Controls.bool(true),
  depthScale: Controls.num(1.2, 0, 10),
  minDepthThreshold: Controls.num(0.4, 0, 10),
  maxDepthThreshold: Controls.num(1.4, 0, 10),
  metalness: Controls.num(0.5),
  roughness: Controls.num(1),
})

function Floor(props: GroupProps) {
  const { name = 'Floor', ...restProps } = props
  const args = useControls(...controls.get())

  return (
    <group name={name} {...restProps}>
      <mesh rotation-x={-Math.PI / 2} scale={[50, 50, 1]}>
        <planeGeometry args={[1, 1]} />
        <MeshReflectorMaterial
          color={args.color}
          blur={[args.blurWidth, args.blurHeight]}
          mixBlur={args.mixBlur}
          mixStrength={args.mixStrength}
          resolution={args.resolution}
          mirror={Number(args.mirror)}
          depthScale={args.depthScale}
          minDepthThreshold={args.minDepthThreshold}
          maxDepthThreshold={args.maxDepthThreshold}
          metalness={args.metalness}
          roughness={args.roughness}
        />
      </mesh>
    </group>
  )
}

export default Floor
