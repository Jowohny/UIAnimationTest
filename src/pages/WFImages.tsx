import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { AnimationSwitch, EffectSwitch, FlipSwitch, type FlipType, type SwitchEffect, type SwitchType } from '../components/AnimationSwitch'
import { CoinCountSwitch, type CoinCount } from '../components/CoinCountSwitch'

gsap.registerPlugin(useGSAP)

const WFImages = () => {
	const container = useRef<HTMLDivElement>(null)
	const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })
	const [activeType, setActiveType] = useState<SwitchType>('center');
	const [activeEffect, setActiveEffect] = useState<SwitchEffect>('strobe');
	const [currentCoins, setCurrentCoins] = useState<CoinCount>({ name: 'little', gap: 20, tile: 300, pad: 40 });
	const [currentFlip, setCurrentFlip] = useState<FlipType>('flip')

	const GAP = currentCoins.gap
	const TILE = currentCoins.tile
	const PAD = currentCoins.pad

	useEffect(() => {
		const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	const gridW = size.w - PAD * 2
	const gridH = size.h - PAD * 2
	const cols = Math.ceil((gridW + GAP) / (TILE + GAP))
	const rows = Math.ceil((gridH + GAP) / (TILE + GAP))
	const tileW = (gridW - GAP * (cols - 1)) / cols
	const tileH = (gridH - GAP * (rows - 1)) / rows

	useGSAP(() => {
			const focals: Record<SwitchType, [number, number]> = {
				center: [(cols - 1) / 2, (rows - 1) / 2],
				start: [cols - 1, rows - 1],
				end: [0, 0],
				edges: [(cols - 1) / 2, (rows - 1) / 2],
				random: [(cols - 1) / 2, (rows - 1) / 2],
			}

			const [fCol, fRow] = focals[activeType]
			const FLIP = 180
			const flipAxis = (axis: 'x' | 'y') => (i: number) => {
				const col = i % cols
				const row = Math.floor(i / cols)
				const dx = fCol - col
				const dy = fRow - row
				const len = Math.hypot(dx, dy) || 1
				return axis === 'y' ? (dx / len) * FLIP : -(dy / len) * FLIP
			}

			if (activeEffect === 'reverse') {
				gsap.fromTo('.wave-tile',
					{ scale: 0.8, opacity: 0, transformPerspective: 600, rotationX: currentFlip === 'flip' ? flipAxis('x') : 0, rotationY: currentFlip === 'flip' ?  flipAxis('y') : 0 },
					{
						scale: 1.1,
						opacity: 1,
						rotationX: 0,
						rotationY: 0,
						transformPerspective: 600,
						duration: 1,
						ease: 'sine.inOut', yoyo: true, repeat: -1,
						stagger: { each: 0.08, grid: [rows, cols], from: activeType},
					}
				)
			} else {
				gsap.fromTo('.wave-tile',
					{ scale: 0.8, opacity: 0, transformPerspective: 600, rotationX: currentFlip === 'flip' ? flipAxis('x') : 0, rotationY: currentFlip === 'flip' ?  flipAxis('y') : 0 },
					{
						scale: 1.1,
						opacity: 1,
						rotationX: 0,
						rotationY: 0,
						transformPerspective: 600,
						duration: 1,
						ease: 'sine.inOut',
						stagger: { each: 0.08, grid: [rows, cols], from: activeType, yoyo: true, repeat: -1},
					}
				)
			}
		}, { scope: container, dependencies: [rows, cols, activeType, activeEffect, currentCoins, currentFlip], revertOnUpdate: true },
	)

	return (
		<div ref={container} className="h-screen w-screen overflow-hidden bg-black p-[20px]" style={{ perspective: 0 }}>
			<div className='fixed top-4 left-4 z-50'>
				<AnimationSwitch 
					currentType={activeType} 
					onTypeChange={(newType) => setActiveType(newType)} 
				/>
			</div>
			<div className='fixed top-4 left-1/3 translate-x-1/3 z-50'>
				<EffectSwitch
					currentEffect={activeEffect}
					onTypeChange={(newEffect) => setActiveEffect(newEffect)}
				/>
			</div>
			<div className='fixed top-4 left-1/2 translate-x-1/2 z-50'>
				<FlipSwitch
					currentFlip={currentFlip}
					onTypeChange={(newFlip) => setCurrentFlip(newFlip)}
				/>
			</div>
			<div className='fixed top-4 right-4 z-50'>
				<CoinCountSwitch
					currentCount={currentCoins}
					onTypeChange={(newCount) => setCurrentCoins(newCount)}
				/>
			</div>
			<div className="flex flex-col gap-[20px]">
				{Array.from({ length: rows }, (_, i) => (
					<div key={`row${i}`} className="flex flex-row gap-[20px]">
						{Array.from({ length: cols }, (_, j) => (
							<img
								key={`row${i}col${j}`}
								src='/wave/quarter.png'
								style={{ width: tileW, height: tileH }}
								className="wave-tile object-cover"
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default WFImages
