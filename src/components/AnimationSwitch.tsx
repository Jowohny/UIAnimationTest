import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export type SwitchType = 'center' | 'start' | 'end' | 'edges' | 'random'
export type SwitchEffect = 'strobe' | 'reverse'
export type FlipType = 'flip' | 'non-flip'

interface AnimationSwitchProps {
  currentType: SwitchType;
	onTypeChange: (selectedType: SwitchType) => void;
}

interface AnimationEffectProps {
  currentEffect: SwitchEffect;
	onTypeChange: (selectedType: SwitchEffect) => void;
}

interface AnimationFlipProps {
	currentFlip: FlipType;
	onTypeChange: (selectedType: FlipType) => void;
}

const animationTypes: SwitchType[]  = ['center', 'start', 'end', 'edges', 'random']
const animationEffects: SwitchEffect[] = ['strobe', 'reverse']
const animationFlips: FlipType[] = ['flip', 'non-flip']

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
					className={`options opacity-0 rounded-full font-black tracking-wide text-center px-3 py-2 uppercase duration-300 transition-all 
						${ currentType === type ? 'bg-white text-blue-800' : ''}`}
				>
					{type}
				</div>
			))}
		</div>
	)
}

export const EffectSwitch = ({ currentEffect, onTypeChange }: AnimationEffectProps ) => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const mm = gsap.matchMedia()

		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const intro = gsap.timeline()
			intro.from(container.current, {
				opacity: 0,
				duration: 1,
				ease: 'sine.out',
				delay: 0.125,
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
			{animationEffects.map(effect => (
				<div 
					key={effect} 
					onClick={() => onTypeChange(effect)}
					className={`options opacity-0 rounded-full font-black tracking-wide text-center px-3 py-2 uppercase duration-300 transition-all 
						${ currentEffect === effect ? 'bg-white text-blue-800' : ''}`}
				>
					{effect}
				</div>
			))}
		</div>
	)
}

export const FlipSwitch = ({ currentFlip, onTypeChange }: AnimationFlipProps ) => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const mm = gsap.matchMedia()

		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const intro = gsap.timeline()
			intro.from(container.current, {
				opacity: 0,
				duration: 1,
				ease: 'sine.out',
				delay: 0.25,
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
			{animationFlips.map(flip => (
				<div 
					key={flip} 
					onClick={() => onTypeChange(flip)}
					className={`options opacity-0 rounded-full font-black tracking-wide text-center px-3 py-2 uppercase duration-300 transition-all 
						${ currentFlip === flip ? 'bg-white text-blue-800' : ''}`}
				>
					{flip}
				</div>
			))}
		</div>
	)
}

