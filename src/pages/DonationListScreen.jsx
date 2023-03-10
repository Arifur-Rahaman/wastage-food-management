import { Grid, Typography, Paper, Button, Stack, IconButton, Container } from '@mui/material'
import { Box } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import Loader from '../components/Loader'
import { deleteFoodById, getUserFoods } from '../features/foods/foodSlice'
import { toast } from 'react-toastify';
import { truncate } from '../utils/truncate';

function DonationListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userFoods } = useSelector(state => state.food)
    useEffect(() => {
        dispatch(getUserFoods())
    }, [dispatch])

    const handleClick = (foodId) => {
        navigate(`/request/food/${foodId}`)
    }
    const handleDelete = (food) => {
        if (window.confirm("Do you really want to Delete?")) {
            dispatch(deleteFoodById(food._id))
                .unwrap()
                .then(() => {
                    toast.success('Deleted successfully')
                })
                .catch((error) => {
                    toast.error('Something wrong')
                })
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <Container>
            <Grid container sx={{ p: '0 32px' }} direction='column'>
                <Grid item>
                    <Typography variant='h4'>
                        All Donations
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={4} sx={{ p: '32px 0' }}>
                        {
                            userFoods.map(food => (
                                <Grid item md={3} key={food._id}>
                                    <Paper
                                    >
                                        <img
                                            src={food.imageURL}
                                            alt='food'
                                            style={{ width: '100%', height: '200px', borderRadius: '10px 10px 0 0' }}
                                        />
                                        <Stack gap='4px' sx={{ p: '16px' }}>
                                            <Stack
                                                direction='row'
                                                justifyContent='space-between'
                                                alignItems='center'
                                            >
                                                <Typography variant='h6'>{food.foodName}</Typography>
                                                <Typography variant='body2' sx={{ mb: '4px' }}>
                                                    <Badge
                                                        bg={food.status === 'booked' ? 'primary' : 'warning'}
                                                    >
                                                        {food.status}
                                                    </Badge>
                                                </Typography>
                                            </Stack>
                                            <Typography variant='body1'>{truncate(food.description, 25)}</Typography>
                                            <Typography variant='body2'>{food.area}</Typography>
                                            <Typography variant='subtitle2'>{truncate(food.address, 30)}</Typography>

                                            <Stack direction='row' justifyContent='space-between' sx={{ mt: '8px' }}>
                                                <Button
                                                    variant='contained'
                                                    size="small"
                                                    onClick={() => handleClick(food._id)}
                                                    endIcon={<VisibilityIcon fontSize='large' />}
                                                >
                                                    Requests
                                                </Button>
                                                <Box>
                                                    <IconButton
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={() => navigate(`/editFood/${food._id}`)}
                                            
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(food)}
                                                        variant='contained'
                                                        color='error'
                                                    >
                                                        <DeleteIcon size="large" />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DonationListScreen