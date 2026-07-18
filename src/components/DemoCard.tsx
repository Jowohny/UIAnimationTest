import { Link } from "react-router-dom"
import type { Demo } from "../data/DemoData"

const DemoCard = ({ title, desc, path }: Demo) => {
	return (
		<Link
			to={path}
			className='flex flex-col rounded-2xl border p-6 border-white/10 bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.06]'
		>
			<h2 className="mt-3 text-xl font-semibold">{title}</h2>
			<p className="mt-2 text-sm leading-relaxed text-white/50">{desc}</p>
			<span className="mt-auto pt-8 text-sm font-medium text-white/70">Open →</span>
		</Link>
	)
}

export default DemoCard
