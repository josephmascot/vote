import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'

function Voting() {
	const [loading, setLoading] = useState(true)
	const [positions, setPositions] = useState([])

	useEffect(() => {
		axios
			.get('https://623e1592df20a75d53c3eafb.mockapi.io/positions')
			.then((res) => {
				setPositions(res.data)
				setLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])
	return (
		<Box sx={{ marginTop: 3, marginBottom: 3 }}>
			<Typography variant='h2'>Full Poll</Typography>
			{loading && <h3>Loading...</h3>}
			{positions &&
				positions.map((position) => (
					<Box key={position.id} sx={{ marginTop: 1.5 }}>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Box display='flex'>
									<Typography variant='h3' color='text.secondary' gutterBottom>
										{position.name}
									</Typography>
									<Box display='flex'>
										{position.candidates.map((c) => (
											<Box sx={{ marginLeft: 1.5, marginTop: 1.5 }}>
												<Avatar
													alt={c.name}
													src={c.image}
													sx={{ width: 35, height: 35 }}
												/>
											</Box>
										))}
									</Box>
								</Box>
							</CardContent>
							<CardActions>
								<Button size='small'>
									<Link to={`/vote/${position.id}`}>
										<Box display='flex'>
											Vote
											<Box>
												<ArrowForwardIcon />
											</Box>
										</Box>
									</Link>
								</Button>
							</CardActions>
						</Card>
					</Box>
				))}
		</Box>
	)
}

export default Voting
