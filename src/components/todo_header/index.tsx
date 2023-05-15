import React from 'react'
import { taskType } from '../../App';
import { Button, Grid, TextField, Chip } from '@mui/material';

interface Props {
    saveTask(): void;
    setTask: React.Dispatch<React.SetStateAction<taskType | null>>
    task: taskType | null
    listLength: number
    deleteAll(): void
}

const TodoHeader:React.FC<Props> = ({saveTask, setTask, task, listLength, deleteAll}) => {

    function clickHandler(){
        if(task){
            saveTask()
            setTask(null)
        }
    }


    function taskChange(text: string){
        if(task){
            const newTask = {...task}
            newTask.text = text
            setTask(newTask)
        }else{
            const newTask: taskType = {
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                text
              }
            setTask(newTask)
        }
    }

    return (
        <Grid container direction='column'>
            <Grid 
                container
                direction="row"
                alignItems="center"
                wrap='nowrap'
                margin='0 0 20px'
            > 
                <TextField 
                    fullWidth
                    id="outlined-basic"
                    label="Write your task"
                    variant="outlined" 
                    type="text" 
                    placeholder='Write your task' 
                    value={task ? task.text : ''} 
                    onChange={(e) => taskChange(e.target.value)}
                />
    
                <Button onClick={clickHandler} variant='contained' color='secondary' style={{margin: '0 0 0 15px'}}>Add</Button>
            </Grid>


            <Grid 
                container 
                direction="row"
                alignItems="center"
                wrap='nowrap'
                justifyContent="space-between"
            >
                <Button variant='contained' color='secondary' onClick={deleteAll}>
                    Delete all
                </Button>
                <Chip label={`Total todo's - ${listLength}`} color='secondary'/>
            </Grid>
           
        </Grid>
    ) 
}

export default TodoHeader