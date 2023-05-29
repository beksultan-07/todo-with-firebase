import React, { useEffect } from 'react'
import { Box, List, ListItem, ListItemText, Divider, Grid, Button, Typography } from '@mui/material'
import { UserType } from '../auth_register'
import { useNavigate } from 'react-router-dom'
import { taskType } from '../owner_todo'


type Props = {
    users: Array<{
        name: string
        tasks?: Array<taskType> 
        hash?: string
    }>,
    title: string
    back(): void
}

const Users:React.FC<Props> = ({users, title, back}) => {   
    const nav = useNavigate()

    function userClickHandler(hash?: string) {
        if(title !== 'Task Liked'){
            nav('/key=' + hash)
        }
    }

  return (
    <Box
        sx={{
            flex: 1,
            backgroundColor: 'rgb(255, 255, 255)',
            border: 'solid 3px #9c27b0',
            padding: '20px',
            borderRadius: 2,
            height: '400px',
            overflowY: 'auto'
        }}
    >
        <Typography mb={2} variant="h3" lineHeight="lg" textAlign='center'>
            {title}
        </Typography>
        {
            title === 'Task Liked' ?
            <Button onClick={back} variant='contained' color='secondary' style={{margin: '0 0 0 15px'}}>Back</Button> : 
            null
        }
        {users.length === 0?
            <Typography margin='20px 0' variant="body1" lineHeight="lg" textAlign='center'>
                No data
          </Typography>:
        null
        } 
         <List>
            {users.map((el, index) => (
                <React.Fragment key={index}>
                    <ListItem
                        disableGutters
                    >
                        <Button 
                            style={{color: '#000', width: '100%'}} 
                            onClick={() => userClickHandler(el.hash)} 
                        >
                            <Grid container width='100%' justifyContent='space-between' alignItems='flex-start' padding='10px 20px'>
                                <ListItemText primary={`${el.name}`} />
                                {
                                    title !== 'Task Liked' ?
                                    <ListItemText primary={`tasks - ${el.tasks ? el.tasks.length: 0}`} style={{marginLeft: '10px'}}/>:
                                    null
                                }
                            </Grid>
                        </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" style={{marginLeft: 0}}/>
                </React.Fragment>
            ))}
        </List>
    </Box>
  )
}

export default Users