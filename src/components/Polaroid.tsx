export interface PolaroidProps {
	picturePath: string
	pictureSize: number
}

const Polaroid = ({ picturePath, pictureSize }: PolaroidProps) => {
	const W = pictureSize
	const pad = Math.round(W * 0.05)
	const bottom = Math.round(W * 0.25)
	const photo = W - pad * 2

	return (
		<div
			className="relative select-none"
			style={{
				width: W,
				paddingTop: pad,
				paddingLeft: pad,
				paddingRight: pad,
				paddingBottom: bottom,
				borderRadius: 2,
				background: 'linear-gradient(152deg, #fdfcf7 0%, #f5f2ea 55%, #ebe7db 100%)',
				boxShadow:
					'0 1px 1px rgba(0,0,0,0.28), 0 14px 26px -10px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.55), inset 0 0 26px rgba(120,108,84,0.12)',
			}}
		>
			<div
				className="relative overflow-hidden"
				style={{ width: photo, height: photo, borderRadius: 1, background: '#0d0d0f' }}
			>
				<img
					src={picturePath}
					draggable={false}
					className="block h-full w-full object-cover"
				/>

				<div
					className="pointer-events-none absolute inset-0"
					style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.28)' }}
				/>
			</div>
		</div>
	)
}

export default Polaroid
