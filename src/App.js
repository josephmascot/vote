import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Vote from './pages/Vote'
import Login from './pages/Login'
import Voting from './pages/Voting'
import Register from './pages/Register'

function App() {
	return (
		<Router>
			<Navbar />
			<div className='main'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/vote' element={<Voting />} />
					<Route path='/vote/:id' element={<Vote />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	)
}

export default App
