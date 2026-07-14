import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const images = [
	'/carousel/01.png',
	'/carousel/02.png',
	'/carousel/03.png',
	'/carousel/04.png',
	'/carousel/05.png',
	'/carousel/06.png',
	'/carousel/01.png',
	'/carousel/02.png',
	'/carousel/03.png',
	'/carousel/04.png',
	'/carousel/05.png',
	'/carousel/06.png'
]

const CARD_WIDTH = 340
const CARD_HEIGHT = 200
const GAP = 20
const RESTING_TILT = -5

const angleStep = 360 / images.length
const radius = Math.round((CARD_WIDTH + GAP) / 2 / Math.tan(Math.PI / images.length))

const App = () => {
	const scene = useRef<HTMLDivElement>(null)
	const ring = useRef<HTMLDivElement>(null)

	useGSAP(() => {
			gsap.set(ring.current, { rotationY: 0, rotationX: RESTING_TILT })

			gsap.to(ring.current, {
				rotationY: 360,
				ease: 'none',
				scrollTrigger: {
					trigger: scene.current,
					start: 'top top',
					end: '+=4000',
					pin: true,
					scrub: 0.5,
				},
			})
		}, { scope: scene })

	return (
		<div
			ref={scene}
			className="flex h-screen w-full items-center bg-black justify-center overflow-hidden"
			style={{ perspective: 1400 }}
		>
			<div
				ref={ring}
				className="relative"
				style={{
					width: CARD_WIDTH,
					height: CARD_HEIGHT,
					transformStyle: 'preserve-3d',
				}}
			>
				{images.map((src, i) => (
					<div
						key={src + i}
						className="absolute inset-0 rounded-2xl border border-white/50 shadow-2xl shadow-black/50"
						style={{
							transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
							transformStyle: 'preserve-3d',
						}}
					>
						<img
							src={src}
							draggable={false}
							className="absolute inset-0 h-full w-full rounded-2xl bg-neutral-800 object-cover"
							style={{ backfaceVisibility: 'hidden' }}
						/>
						<div
							className="absolute inset-0 flex animate-pulse flex-col items-center justify-center gap-3 rounded-2xl bg-neutral-800/70 p-6"
							style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.5}
								className="h-10 w-10 text-white/20"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" />
								<circle cx="8.5" cy="8.5" r="1.5" />
								<path d="M21 15l-5-5L5 21" />
							</svg>
							<div className="h-2 w-2/3 rounded-full bg-white/10" />
							<div className="h-2 w-1/2 rounded-full bg-white/10" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
