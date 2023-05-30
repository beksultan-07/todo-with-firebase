import React from 'react'
import OwnerTodoHeader from '../owner_todo_header';
import OwnerTodoList from '../owner_todo_list';

import { getDatabase, ref, push, update, remove } from "firebase/database";
import { Box, Typography } from "@mui/material";
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { UserType } from '../auth_register';
import { setUser } from '../../store/actions/users';

export type likedTask = {
  name: string
  hash: string
  likedHash?: string
}

export type taskType = {
    id: number,
    userEmail: string, 
    text: string,
    visible: boolean,
    checked: boolean,
    time: number,
    liked: Array<likedTask>
    hash?: string 
}


type Props = {
  likedTasks(likedList: Array<likedTask>): void
}

const OwnerTodo:React.FC<Props> = ({likedTasks}) => {
  const [task, setTask] = React.useState<taskType | null>(null)
  
  const database = getDatabase();
  
    const user = useSelector((state: RootState) => state.users.user)
    const todoList = useSelector((state: RootState) => state.users.user?.tasks)
  
    const dispatch = useDispatch()

  
    function saveTask(){
      if(task){
        const currentTaskIndex = todoList? todoList.findIndex(el => el.id === task.id): -1
        // add new task to db
        // -1 is if we didnt create task  before
        if(currentTaskIndex === -1){
          push(ref(database, `users/${user?.hash}/tasks/`), task)
            .then(() => {
              if(user){
                const userTasks = user.tasks ? [...user.tasks, task] : [task]  
                dispatch(setUser({...user, tasks: userTasks}))
              }
              console.log("Data was successfully added to the database");
            })
            .catch((error) => {
              console.log(error);
            });
        }else{
          // update the task on db
          const todoRef = ref(database, `users/${user?.hash}/tasks/${task.hash}`);
          update(todoRef, task)
          .then(() => {
            const newTodoList = [...todoList ? todoList : []]
            newTodoList[currentTaskIndex] = task
            if(user){
              dispatch(setUser({...user, tasks: newTodoList}))
            }
            console.log("Data was successfully updated in the database");
          });
  
        }
      }
    }
  
  
  
    function deleteTask (id:number){
      if(todoList){
        const hash = todoList.filter(el => el.id === id)[0].hash
        const dataRef = ref(database, `users/${user?.hash}/tasks/${hash}`);
    
        // delete task from db
        remove(dataRef)
          .then(() => {
            console.log("Data successfully removed.");
            if(user){
              dispatch(setUser({...user, tasks: user.tasks.filter(el => el.id !== id)}))
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  
    function deleteAll(){
      const dataRef = ref(database, `users/${user?.hash}/tasks`);
  
      // delete task from db
      remove(dataRef)
        .then(() => {
          console.log("Data successfully removed.");
          if(user){
            dispatch(setUser({...user, tasks: []}))
          }
        })
        .catch((error) => {
          console.error(error);
        });
  
    }
  
  
  
    function editTask(id: number){
      if(todoList){
        const editTask = todoList.find(el => el.id === id)
        setTask(editTask ? editTask : null)
      }
    }
  
    function changeVisibility(id: number){
      if(todoList){
        const editTask = todoList.find(el => el.id === id)
        
        if(editTask){
          const currentTaskIndex = todoList.findIndex(el => el.id === editTask.id) 

          const updatedTask = { ...editTask, visible: !editTask.visible };
          
          const todoRef = ref(database, `users/${user?.hash}/tasks/${updatedTask.hash}`);
          update(todoRef, updatedTask)
          .then(() => {
              const newTodoList = [...todoList]
              newTodoList[currentTaskIndex] = updatedTask
              if(user){
                dispatch(setUser({...user, tasks: newTodoList}))
              }
              console.log("Data was successfully updated in the database");
            });
        }
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
          width: '100%',
          maxWidth: '500px',
          height: '400px',
          overflowY: 'auto'
        }}
    >
      <Typography mb={2} variant="h3" lineHeight="lg" textAlign='center'>
        My to do
      </Typography>
  
      <OwnerTodoHeader saveTask={saveTask} setTask={setTask} task={task} listLength={todoList?todoList.length: 0} deleteAll={deleteAll}/>
  
      <OwnerTodoList list={user?.tasks} deleteTask={deleteTask} editTask={editTask} changeVisibility={changeVisibility} likedTasks={likedTasks}/>
    </Box>
    )
}

export default OwnerTodo