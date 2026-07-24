import { Route, Routes } from 'react-router-dom'
import HCarousel from './pages/HCarousel'
import VCarousel from './pages/VCarousel'
import WFImages from './pages/WFImages'
import PolaroidScatter from './pages/PolaroidScatter'
import Hyperspace from './pages/Hyperspace'
import Home from './pages/Home'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/hcarousel' element={<HCarousel/>} />
				<Route path='/vcarousel' element={<VCarousel/>} />
				<Route path='/wfimages' element={<WFImages/>} />
				<Route path='/scatter' element={<PolaroidScatter/>} />
				<Route path='/hyperspace' element={<Hyperspace/>} />
			</Routes>
		</>
	)
}

export default App
