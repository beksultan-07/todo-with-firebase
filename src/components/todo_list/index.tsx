import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';

interface Props {
    list: Array<{
        id: number;
        text: string;
    }>
    deleteTask(id: number): void
    editTask(id: number): void
}

const TodoList:React.FC<Props> = ({list, deleteTask, editTask}) => {
    if(list.length === 0){
        return (
            <Typography margin='20px 0' variant="body1" lineHeight="lg" textAlign='center'>
                No data
          </Typography>
        )
    }
  return (
        <List>
            {list.map((el, index) => (
    
                <React.Fragment key={el.id}>
                    <ListItem
                        disableGutters
                        secondaryAction={
                            <>
                                <IconButton aria-label="comment" onClick={() => editTask(el.id)}>
                                    <EditIcon color='secondary'>edit</EditIcon>
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
            ))}
        </List>
  )
}

export default TodoList