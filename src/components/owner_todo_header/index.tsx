import React from 'react'
import { taskType } from '../owner_todo';
import { Button, Grid, TextField, Chip } from '@mui/material';
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';

interface Props {
    saveTask(): void;
    setTask: React.Dispatch<React.SetStateAction<taskType | null>>
    task: taskType | null
    listLength: number
    deleteAll(): void
}

const OwnerTodoHeader:React.FC<Props> = ({saveTask, setTask, task, listLength, deleteAll}) => {


    const userEmail = useSelector((state: RootState) => state.auth.email) 

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
            newTask.time = new Date().getTime()
            setTask(newTask)
        }else{
            const newTask: taskType = {
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                text,
                userEmail,
                checked: false,
                visible: true,
                time: new Date().getTime(),
                liked: []
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

export default OwnerTodoHeader