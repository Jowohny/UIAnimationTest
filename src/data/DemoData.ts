export type Demo = {
	title: string
	desc: string
	path: string
}

export const demos: Demo[] = [
	{
		title: 'Horozontal 3D Carousel',
		desc: 'A scroll-driven ring of images orbiting an invisible vertical axis.',
		path: '/hcarousel',
	},
	{
		title: 'Vertical 3D Carousel',
		desc: 'A scroll-driven ring of images orbiting an invisible horozontal axis axis.',
		path: '/vcarousel',
	},
	{
		title: 'Image Wave + Flip',
		desc: 'A scroll-driven wave of images rising, falling, and flipping in a diagonal pattern',
		path: '/wfimages',
	}
]