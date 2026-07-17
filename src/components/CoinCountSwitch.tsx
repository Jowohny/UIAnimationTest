import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export type CoinCount = {
	name: string,
	gap: number,
	tile: number,
	pad: number
}

export interface CoinCountSwitchProps {
  currentCount: CoinCount;
	onTypeChange: (selectedType: CoinCount) => void;
}

export const animationTypes: CoinCount[]  = [
	{ name: 'little', gap: 20, tile: 300, pad: 40 },
	{ name: 'moderate', gap: 15, tile: 150, pad: 30 },
	{ name: 'most', gap: 5, tile: 50, pad: 10 }
]

export const CoinCountSwitch = ({ currentCount, onTypeChange }: CoinCountSwitchProps ) => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const mm = gsap.matchMedia()

		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const intro = gsap.timeline()
			intro.from(container.current, {
				opacity: 0,
				duration: 1,
				ease: 'sine.out',
				y: -30,
				delay: 0.5
			}).fromTo('.options', 
				{ scale: 0 },
				{ scale: 1, duration: 0.7, opacity: 1, stagger: 0.1, ease: 'none' },
				'-=0.5'
			)
		})
	}, { scope: container })

	return (
		<div ref={container} className="px-4 py-2 bg-blue-800 flex border border-4 border-white flex-row gap-4 rounded-full">
			{animationTypes.map(type => (
				<div 
					key={type.name} 
					onClick={() => onTypeChange(type)}
					className={`options opacity-0 rounded-full font-black tracking-wide text-center px-3 py-2 uppercase duration-300 transition-all 
						${ currentCount === type ? 'bg-white text-blue-800' : ''}`}
				>
					{type.name}
				</div>
			))}
		</div>
	)
}

