import { useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'
import { HCI } from '../data/CImages'
import Polaroid from '../components/Polaroid'

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP)

const COUNT = 12
const ROT = 15
const POLAROID_W = 300

type Scatter = { src: string; x: number; y: number; rot: number }

const PolaroidScatter = () => {
	const desk = useRef<HTMLDivElement>(null)
	const focused = useRef<HTMLElement | null>(null)
	const home = useRef({ x: 0, y: 0, rotation: 0 })
	const topZ = useRef(COUNT)

	const { contextSafe } = useGSAP({ scope: desk })

	const [cards] = useState<Scatter[]>(() =>
		Array.from({ length: COUNT }, (_, i) => ({
			src: HCI[i % HCI.length],
			x: gsap.utils.random(-0.32, 0.32),
			y: gsap.utils.random(-0.3, 0.3),
			rot: gsap.utils.random(-ROT, ROT),
		})),
	)

	const bringToFront = (el: HTMLElement) => {
		topZ.current += 1
		el.style.zIndex = String(topZ.current)
	}

	const zoomIn = (el: HTMLElement) => {
		home.current = {
			x: gsap.getProperty(el, 'x') as number,
			y: gsap.getProperty(el, 'y') as number,
			rotation: gsap.getProperty(el, 'rotation') as number,
		}
		bringToFront(el)
		gsap.to(el, {
			x: 0,
			y: 0,
			rotation: 0,
			scale: (window.innerHeight * 0.82) / el.offsetHeight,
			duration: 0.8,
			ease: 'power3.inOut',
		})
		focused.current = el
	}

	const zoomOut = (el: HTMLElement) => {
		gsap.to(el, { ...home.current, scale: 1, duration: 0.8, ease: 'power3.inOut' })
		focused.current = null
	}

	const toggleZoom = contextSafe((el: HTMLElement) => {
		if (focused.current === el) return zoomOut(el)
		if (focused.current) zoomOut(focused.current)
		zoomIn(el)
	})

	useGSAP(() => {
		const els = gsap.utils.toArray<HTMLElement>('.polaroid')
		const W = window.innerWidth
		const H = window.innerHeight
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		gsap.set(els, { xPercent: -50, yPercent: -50 })
		els.forEach((el, i) => gsap.set(el, { zIndex: i + 1 }))

		if (reduced) {
			els.forEach((el, i) =>
				gsap.set(el, { x: cards[i].x * W, y: cards[i].y * H, rotation: cards[i].rot }),
			)
		} else {
			gsap.set(els, { x: 0, y: 0, rotation: 0, scale: 0.5, autoAlpha: 0 })
			gsap.to(els, {
				x: (i) => cards[i].x * W,
				y: (i) => cards[i].y * H,
				rotation: (i) => cards[i].rot,
				scale: 1,
				autoAlpha: 1,
				duration: 0.7,
				ease: 'back.out(1.4)',
				stagger: { each: 0.05, from: 'random' },
			})
		}

		const draggers = Draggable.create(els, {
			type: 'x,y',
			inertia: true,
			bounds: desk.current,
			edgeResistance: 0.65,
			cursor: 'grab',
			activeCursor: 'grabbing',
			onPress() {
				bringToFront(this.target)
			},
			onDragStart() {
				if (focused.current === this.target) return
				gsap.to(this.target, { scale: 1.06, duration: 0.2, overwrite: 'auto' })
			},
			onDragEnd() {
				if (focused.current === this.target) return
				gsap.to(this.target, { scale: 1, duration: 0.3, overwrite: 'auto' })
			},
			onClick() {
				toggleZoom(this.target)
			},
		})

		return () => draggers.forEach((d) => d.kill())
	},{ scope: desk })

	return (
		<div
			ref={desk}
			onClick={(e) => {
				if (e.target === desk.current && focused.current) toggleZoom(focused.current)
			}}
			className="relative h-screen w-screen overflow-hidden"
			style={{ background: 'radial-gradient(ellipse at 50% 38%, #2b2b30 0%, #101012 62%, #08080a 100%)' }}
		>
			{cards.map((c, i) => (
				<div
					key={i}
					className="polaroid absolute left-1/2 top-1/2 select-none will-change-transform"
				>
					<Polaroid picturePath={c.src} pictureSize={POLAROID_W} />
				</div>
			))}
		</div>
	)
}

export default PolaroidScatter
