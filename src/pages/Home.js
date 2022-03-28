import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

function Home() {
	const [user, setUser] = useState()
	const navigate = useNavigate()

	const handleClick = () => {
		if (user) {
			navigate('/vote')
		} else {
			navigate('/login')
		}
	}

	useEffect(() => {
		let userObj = JSON.parse(localStorage.getItem('userObj'))
		setUser(userObj)
	}, [])
	return (
		<div>
			<Button className='CheckButton' onClick={handleClick}>
				Go vote Now!
			</Button>

			<img
				src='https://webassets.oxfamamerica.org/media/images/VoteVoice-web-2440x1526.width-1200.png'
				alt='Go vote'
			/>
		</div>
	)
}

export default Home
