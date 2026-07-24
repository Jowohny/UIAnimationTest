import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { HCI } from '../data/CImages'

gsap.registerPlugin(useGSAP)

const COUNT = 50
const Z_NEAR = 450
const Z_FAR = -2500

const images = Array.from({ length: COUNT }, (_, i) => HCI[i % HCI.length])

const Hyperspace = () => {
	const scene = useRef<HTMLDivElement>(null)

	useGSAP(() => {
			const tiles = gsap.utils.toArray<HTMLElement>('.tile')
			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

			tiles.forEach((el) => {
				const angle = gsap.utils.random(0, Math.PI * 3)
				const radius = gsap.utils.random(120, 560)
				gsap.set(el, {
					xPercent: -50,
					yPercent: -50,
					x: Math.cos(angle) * radius,
					y: Math.sin(angle) * radius,
					rotationZ: gsap.utils.random(-8, 8),
				})

				if (reduced) {
					gsap.set(el, { z: gsap.utils.random(Z_FAR, Z_NEAR), autoAlpha: 0.85 })
					return
				}

				const dur = gsap.utils.random(9, 16)
				const tl = gsap.timeline({ repeat: -1 })
				tl.fromTo(el, 
					{ z: Z_NEAR }, 
					{ z: Z_FAR, duration: dur, ease: 'none' }, 
					0
				).fromTo(el, 
					{ autoAlpha: 0 }, 
					{ autoAlpha: 1, duration: dur * 0.16, ease: 'power1.out' }, 
					0
				).to(el, { 
					autoAlpha: 0, 
					duration: dur * 0.32, 
					ease: 'power1.in' 
				}, dur * 0.68)
				
				tl.progress(Math.random())
			})
		}, { scope: scene })

	return (
		<div
			ref={scene}
			className="relative h-screen w-screen overflow-hidden bg-black"
			style={{ perspective: 700 }}
		>
			<div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
				{images.map((src, i) => (
					<img
						key={i}
						src={src}
						draggable={false}
						className="tile absolute left-1/2 top-1/2 h-[200px] w-[320px] rounded-lg object-cover ring-1"
						style={{ boxShadow: '0 0 50px rgba(0,0,0,0.7)' }}
					/>
				))}
			</div>
		</div>
	)
}

export default Hyperspace
