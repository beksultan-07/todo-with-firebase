import React from 'react'
import { UserType } from '../auth_register'
import { Box, Typography, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likedTask, taskType } from '../owner_todo';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store';
import { getDatabase, ref, push, remove } from "firebase/database";
import { setUsers } from '../../store/actions/users';

type Props = {
    user?: UserType
}

const OtherTodoList:React.FC<Props> = ({user}) => {

    const owner = useSelector((state: RootState) => state.users.user)
    const users = useSelector((state: RootState) => state.users.users)

    const dispatch = useDispatch()

    const database = getDatabase();


    function saveLikedTaskToRedux(taskId: number, likeInfo: likedTask){
        if(user){
            const newUsers = [...users]
            const userIndex = users.findIndex(el => el.email === user.email)
            
            const userTasks = [...newUsers[userIndex].tasks]
            const userTaskIndex = userTasks.findIndex(el => el.id === taskId)

            const userTask = {...userTasks[userTaskIndex]}
            userTask.liked = [...userTask.liked, likeInfo]

            const newUserTasks = [...userTasks]
            newUserTasks[userTaskIndex] = userTask

            const newUser = { ...newUsers[userIndex], tasks: newUserTasks }

            newUsers[userIndex] = newUser

            dispatch(setUsers(newUsers))
          }
    }

    function deleteLikedTaskFromRedux(taskId: number) {
        if(user){
            const newUsers = [...users]
            const userIndex = users.findIndex(el => el.email === user.email)
            
            const userTasks = [...newUsers[userIndex].tasks]
            const userTaskIndex = userTasks.findIndex(el => el.id === taskId)

            const userTask = {...userTasks[userTaskIndex]}
            // userTask.liked = [...userTask.liked, likeInfo]
            userTask.liked = userTask.liked.filter(el => el.hash !== owner?.hash) 

            const newUserTasks = [...userTasks]
            newUserTasks[userTaskIndex] = userTask

            const newUser = { ...newUsers[userIndex], tasks: newUserTasks }

            newUsers[userIndex] = newUser

            dispatch(setUsers(newUsers))
          }
    }

    function taskLikeHandler(task: taskType){
        if(owner){
            if(!task.liked.some(el => el.hash === owner?.hash)){
                const likeInfo: likedTask = {
                    name: owner.name,
                    hash: owner.hash ? owner.hash : ''
                }
                
                push(ref(database, `users/${user?.hash}/tasks/${task.hash}/liked`), likeInfo)
                .then((pushedRef) => {
                    const pushedKey = pushedRef.key; 
                    likeInfo.likedHash = pushedRef.key || undefined
                    saveLikedTaskToRedux(task.id, likeInfo)
                    console.log("Data was successfully added to the database");
                })
                .catch((error) => {
                  console.log(error);
                });
            }else{
                const likedHash = task.liked.find(el => el.likedHash === owner?.hash)
                remove(ref(database, `users/${user?.hash}/tasks/${task.hash}/liked/${likedHash}`))
                .then(() => {
                    deleteLikedTaskFromRedux(task.id)
                    console.log("Data was successfully removed from the database");
                })
                .catch((error) => {
                  console.log(error);
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
          maxWidth: '500px',
          height: '400px',
          overflowY: 'auto'
        }}
    >
      <Typography mb={2} variant="h3" lineHeight="lg" textAlign='center'>
        {user?.name}'s to do list
      </Typography>

      <List>
            {user?.tasks ? user.tasks.map((el, index) => {
                if(el.visible){
                    return (
                        <React.Fragment key={el.id}>
                            <ListItem
                                disableGutters
                                secondaryAction={
                                    <>
                                        <IconButton aria-label="comment" onClick={() => taskLikeHandler(el)}>
                                            {
                                                el.liked.some(el => el.hash === owner?.hash)
                                                    ? <FavoriteIcon color='secondary'/>
                                                    : <FavoriteBorderIcon color='secondary'/>
                                        }
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText primary={`${index+1}. ${el.text}`} />
                            </ListItem>
                            <Divider variant="inset" component="li" style={{marginLeft: 0}}/>
                        </React.Fragment>
                    )
                }
            }
            ) : ''}
        </List>
    </Box>
  )
}

export default OtherTodoList