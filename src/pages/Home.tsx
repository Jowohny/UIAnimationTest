import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { demos } from '../data/DemoData'
import DemoCard from '../components/DemoCard'

gsap.registerPlugin(useGSAP)

const Home = () => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				gsap.from('.reveal', {
					opacity: 0,
					y: 48,
					ease: 'sine.out',
					stagger: 0.2
					
				})
			})
		},
		{ scope: container },
	)

	return (
		<div ref={container} className="min-h-screen w-full bg-black">
			<div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
				<p className="reveal text-xs font-medium uppercase tracking-[0.35em] text-white/40">
					UI Animation Test
				</p>
				<h1 className="reveal mt-4 text-7xl font-black leading-[0.95] tracking-tight">
					My Animations
				</h1>
				<p className="reveal mt-5 max-w-md text-base text-white/50">
					A growing collection of motion and 3D experiments, built with GSAP.
				</p>

				<div className="reveal mt-16 grid grid-cols-3 gap-5">
					{demos.map((demo, i) => (
						<DemoCard key={i} {...demo} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
