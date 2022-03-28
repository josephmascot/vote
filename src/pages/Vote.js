import {
	Alert,
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Vote() {
	const [votedFor, setVotedFor] = useState(0)
	const [user, setUser] = useState()
	const [voted, setVoted] = useState(false)
	const [loading, setLoading] = useState(true)
	const [otherVotes, setOtherVotes] = useState([])
	const [position, setPosition] = useState()
	const { id } = useParams()
	const [alreadyVoted, setAlreadyVoted] = useState(false)

	const handleChange = (event) => {
		setVotedFor(event.target.value)
	}

	const handleVote = (votedFor) => {
		let candidate = position.candidates.find((item) => item.name === votedFor)

		const newCandidates = position.candidates.map((c) => {
			return c.id === candidate.id
				? { ...c, votes: Number(candidate.votes) + 1 }
				: { ...c }
		})
		const sortedCandidates = newCandidates.sort((a, b) => {
			return b.votes - a.votes
		})

		setPosition({ ...position, candidates: sortedCandidates })
		setVoted(true)
		setAlreadyVoted(true)
	}
	const handleUnvote = (candidate) => {
		const newCandidates = position.candidates.map((c) => {
			return c.id === candidate.id
				? { ...c, votes: Number(candidate.votes) - 1 }
				: { ...c }
		})
		const sortedCandidates = newCandidates.sort((a, b) => {
			return b.votes - a.votes
		})

		setPosition({ ...position, candidates: sortedCandidates })
		setVoted(false)
	}
	useEffect(() => {
		axios
			.put(
				`https://623e1592df20a75d53c3eafb.mockapi.io/positions/${id}`,
				position
			)
			.then((res) => {
				axios
					.get('https://623e1592df20a75d53c3eafb.mockapi.io/positions')
					.then((res) => {
						setOtherVotes(res.data)
						console.log(otherVotes)
						setLoading(false)
					})
					.catch((err) => console.log(err))
			})

			.catch((err) => console.log(err))

		// setVoteCount(totalVotes)
	}, [id, position])

	useEffect(() => {
		axios
			.get(`https://623e1592df20a75d53c3eafb.mockapi.io/positions/${id}`)
			.then((res) => {
				setPosition(res.data)
				setLoading(false)
			})
			.catch((err) => console.log(err))
	}, [id])

	useEffect(() => {
		axios
			.get('https://623e1592df20a75d53c3eafb.mockapi.io/positions')
			.then((res) => {
				setOtherVotes(res.data)
				setLoading(false)
			})
			.catch((err) => console.log(err))
	}, [id, position])

	useEffect(() => {
		let userObj = JSON.parse(localStorage.getItem('userObj'))
		setUser(userObj)
	}, [])

	return (
		<Box display='flex' sx={{ paddingTop: 2 }}>
			<Box>
				{loading && <h3>Loading...</h3>}
				{position && (
					<Typography gutterBottom variant='h4'>
						{position.name}
					</Typography>
				)}
				<br />

				<Grid container spacing={5}>
					{position &&
						position.candidates.map((candidate) => (
							<Grid item key={candidate.id}>
								<Card sx={{ maxWidth: 500 }}>
									<CardMedia align='center'>
										<Avatar
											alt={candidate.name}
											src={candidate.image}
											sx={{ width: 100, height: 100 }}
										/>
									</CardMedia>
									<CardContent>
										<Typography gutterBottom variant='h5' component='div'>
											{candidate.name} ({candidate.votes} votes)
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
				</Grid>
				{alreadyVoted ? (
					<Alert severity='success'>Vote submitted for {votedFor}</Alert>
				) : (
					<>
						{position && (
							<FormControl fullWidth sx={{ marginTop: 2 }}>
								<InputLabel id='demo-simple-select-label'>
									Candidates
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={votedFor}
									label='Candidates'
									onChange={handleChange}>
									{position.candidates.map((candidate) => (
										<MenuItem value={candidate.name}>{candidate.name}</MenuItem>
									))}
								</Select>
								<Button size='small' onClick={(e) => handleVote(votedFor)}>
									Confirm Vote
								</Button>
							</FormControl>
						)}
					</>
				)}
			</Box>
			<Paper sx={{ marginLeft: 'auto', padding: 2 }}>
				<Typography variant='h4' color='text.secondary' gutterBottom>
					Ongoing votes
				</Typography>
				{otherVotes &&
					otherVotes.map((p) => (
						<Card sx={{ minWidth: 275, marginBottom: 2 }}>
							<CardContent>
								<Typography color='text.secondary' gutterBottom>
									{p.name}
								</Typography>
								<Typography color='text.primary' gutterBottom>
									Leading:{' '}
									<Typography variant='body' color='secondary'>
										{p.candidates[0].name} ({p.candidates[0].votes} votes)
									</Typography>
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small'>
									<Link to={`/vote/${p.id}`}>Go vote</Link>
								</Button>
							</CardActions>
						</Card>
					))}
			</Paper>
		</Box>
	)
}

export default Vote
