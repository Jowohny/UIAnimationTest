import { Route, Routes } from 'react-router-dom'
import HCarousel from './pages/HCarousel'
import Home from './pages/Home'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/hcarousel' element={<HCarousel/>} />
			</Routes>
		</>
	)
}

export default App
