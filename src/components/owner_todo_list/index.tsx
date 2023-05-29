import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { likedTask, taskType } from '../owner_todo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    list: Array<taskType> | null | undefined
    deleteTask(id: number): void
    editTask(id: number): void
    changeVisibility(id: number): void
    likedTasks(likedList: Array<likedTask>): void
}

const OwnerTodoList:React.FC<Props> = ({list, deleteTask, editTask, changeVisibility, likedTasks}) => {
    if(!list){
        return (
            <Typography margin='20px 0' variant="body1" lineHeight="lg" textAlign='center'>
                No data
          </Typography>
        )
    }  
  return (
        <List>
            {list ? list.map((el, index) => (
    
                <React.Fragment key={el.id}>
                    <ListItem
                        disableGutters
                        secondaryAction={
                            <>
                                <IconButton aria-label="comment" onClick={() => changeVisibility(el.id)}>
                                    {el.visible ? 
                                        <VisibilityIcon color='secondary'/> :
                                        <VisibilityOffIcon color='secondary'/> 
                                    }
                                </IconButton>
                                <IconButton aria-label="comment" onClick={() => likedTasks(el.liked)}>
                                    <FavoriteIcon color='secondary'/>
                                </IconButton>
                                <IconButton aria-label="comment" onClick={() => editTask(el.id)}>
                                    <EditIcon color='secondary'/>
                                </IconButton>
                                <IconButton aria-label="comment" onClick={() => deleteTask(el.id)}>
                                    <DeleteIcon color='secondary'/>
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText primary={`${index+1}. ${el.text}`} />
                    </ListItem>
                    <Divider variant="inset" component="li" style={{marginLeft: 0}}/>
                </React.Fragment>
            )) : ''}
        </List>
  )
}

export default OwnerTodoList