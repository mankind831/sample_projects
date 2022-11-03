import React from 'react'
import { Button, Card, Container, TextField, Typography, Autocomplete, CardContent} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image'

const Profile = () => {
  return (
<Container>
        <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden">
                <Card sx={{height:50}}>
                    &nbsp;
                </Card>
            </div>
            <div className="w-full overflow-hidden flex justify-center">
                <div className='drop-shadow-2xl border-bold'>
                <Card sx={{width:700, height: 800}} variant='outlined'  >
                    <CardContent>
                        <div className='flex justify-center'>
                            <Container>
                                <div className='flex justify-center'>
                                    <Image className='rounded' src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt='' width={250} height={300} />
                                </div>
                                <br />
                                <div className='flex justify-center'>
                                    <Button variant="contained" color="primary" sx={{height:50 , width: 250}}><PhotoCameraIcon/>&nbsp;Upload Picture</Button>
                                </div>
                            </Container>
                        </div>
                        <br />
                        <br />
                        <div className='flex justify-center'>
                            <Container>
                                <TextField id="fname" name="First Name" label="First Name" value={"Rodel Ray"} variant="standard" sx={{width:600}}></TextField> <br /><br />
                                <TextField id="lname" name="Last Name" label="Last Name" value={"Boc"} variant="standard" sx={{width:600}}></TextField> <br /><br />
                                <TextField id="fname" name="First Name" label="Email" value={"rodel.boc@gmail.com"} variant="standard" sx={{width:600}}></TextField> <br /><br />
                            </Container>
                        </div>
                        <br />
                        <div className='flex justify-center'>
                            <Container>
                                <Button variant="contained" color="success" sx={{height:50, width: 600}}><EditIcon />&nbsp;Edit Information</Button> <br /><br />
                                <Button variant="contained" color="warning" sx={{height:50 , width: 600}}><KeyIcon />&nbsp;Change Password</Button>
                            </Container>
                        </div>
                        <br /><br />
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Profile
