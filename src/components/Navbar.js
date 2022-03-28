import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' color='primary'>
				<Container>
					<Toolbar>
						<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
							<Link to='/'> <strong>Great Minds Voting portal </strong></Link>
						</Typography>

						<Button color='inherit'>
							<Link to='/'>Home</Link>
						</Button>
						<Button color='inherit'>
							<Link to='/vote'>Vote</Link>
						</Button>
						<Button color='inherit'>
							<Link to='/login'>Login</Link>
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	)
}

export default Navbar
