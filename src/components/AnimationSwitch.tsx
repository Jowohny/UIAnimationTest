import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export type SwitchType = 'center' | 'start' | 'end' | 'edges'

export interface AnimationSwitchProps {
  currentType: SwitchType;
	onTypeChange: (selectedType: SwitchType) => void;
}

const animationTypes: SwitchType[]  = ['center', 'start', 'end', 'edges']

export const AnimationSwitch = ({ currentType, onTypeChange }: AnimationSwitchProps ) => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const mm = gsap.matchMedia()

		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const intro = gsap.timeline()
			intro.from(container.current, {
				opacity: 0,
				duration: 1,
				ease: 'sine.out',
				y: -30
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
					key={type} 
					onClick={() => onTypeChange(type)}
					className={`options opacity-0 text-white rounded-full font-black tracking-wide text-center px-3 py-2 uppercase duration-300 transition-all 
						${ currentType === type ? 'bg-white text-blue-800 border border-black' : ''}`}
				>
					{type}
				</div>
			))}
		</div>
	)
}

