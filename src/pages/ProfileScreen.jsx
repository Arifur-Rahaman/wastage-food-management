import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, updateUserProfile, uploadProfileImageFile } from '../features/auth/authSlice'
import Loader from '../components/Loader'
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';

const typographyStyle = {
  borderBottom: '1px solid #ccc',
  padding: '0 0 8px 4px'
}

function ProfileScreen() {
  const dispatch = useDispatch()
  const {isUploading,  isLoading, isError, error, profile } = useSelector(state => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [fileData, setFileData] = useState(null)
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setFileData(bodyFormData)
}

const handleUpdate = ()=>{
  dispatch(updateUserProfile({imageURL: profile.imageURL}))
  .unwrap()
  .then(()=>{
    toast.success('Updated!')
    setEditMode(false)
  })
  .catch((error)=>{
    toast.error('Something wrong!')
  })
}
  const handleUpload = ()=>{
    dispatch(uploadProfileImageFile(fileData))
    .unwrap()
    .then(()=>{
      toast.success('Uploaded')
      
    })
    .catch((error)=>{
      toast.error(error)
    })
  }
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    <p>{error}</p>
  }
  return (
    <Container>
      <Grid container sx={{ border: `1px solid #f2d2b8` }}>
        <Grid
          item xs={12}
          sx={{
            borderBottom: `1px solid #f2d2b8`,
            background: `#fbf0e7`
          }}
        >
          <Typography variant='subtitle1' sx={{ p: '8px 12px ' }}>User Profile</Typography>
        </Grid>

        {/* Image and info section */}
        <Grid item container sx={{ pt: '16px' }} columnGap={'32px'}>
          <Grid item container direction='column' rowGap='8px' md={3} sx={{p: '0 16px'}}>
            <img src={profile.imageURL} alt="" style={{ width: '100%' }} />
            {
              editMode && <> <TextField onChange={handleFileChange} type='file' size='small'/>
              <Button variant='contained' size='small' onClick = {handleUpload} disabled={isUploading}>{isUploading? 'Uploading...': 'Upload'}</Button></>
            }
          </Grid>
          <Grid item container direction={'column'} md={6} rowGap='16px'>
            <Box sx={{ borderBottom: '1px solid #ccc', p: '0 0 8px 4px' }}>
              <Typography variant='h4'>{profile.name}</Typography>
              <Typography variant='subtitle2'>A proud user of Food Wastage Management Stystem</Typography>
            </Box>
            <Stack direction={'row'} alignItems='center' sx={typographyStyle} columnGap='8px'>
              <HomeIcon />
              <Typography variant='h6' >{profile.address}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems='center' columnGap='8px' sx={typographyStyle}>
              <EmailIcon />
              <Typography variant='h6'>{profile.email}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems='center' columnGap='8px'>
              <PhoneInTalkIcon />
              <Typography variant='h6' sx={{ p: '0 0 4px 4px' }}>{profile.phone}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={'flex-end'}
          xs={12}

          sx={{
            p: '8px'
          }}
        >
          {
            editMode
              ? (<>
              <Button
                onClick={handleUpdate}
                variant='contained'
                sx={{mr:'8px'}}
              >
                Update
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={()=>setEditMode(false)}
              >
                Cancel
              </Button>
              </>)
              : (<Button
                variant='contained'
                endIcon={<EditIcon />}
                onClick={()=>setEditMode(true)}
              >
                Edit
              </Button>)
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfileScreen