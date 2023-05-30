import React from 'react'
import OwnerTodo, { likedTask } from '../../components/owner_todo'
import { Container, Grid } from '@mui/material';
import Users from '../../components/users';
import Header from '../../components/header';
import OtherTodoList from '../../components/other_user_todo';
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UserType } from '../../components/auth_register';

const Home:React.FC = () => {

  const [owner, setOwner] = React.useState(true)
  const [liked, setLiked] = React.useState(false)

  const [clickedUser, setClickedUser] = React.useState<UserType | undefined>(undefined)
  const [usersList, setUsersList] = React.useState<Array<UserType>>([])
  const [likedList, setLikedList] = React.useState<Array<likedTask>>([])

  const users = useSelector((state: RootState) => state.users.users)
  const user = useSelector((state: RootState) => state.users.user)

  const location = useLocation();
  

  function likedTasks(likedList: Array<likedTask>){
    setLiked(true)
    setLikedList(likedList)
  }
  
  
  React.useEffect(() => {
    const key = location.pathname.slice(5, location.pathname.length)
    if(key){
        const currentUser = users.find(el => el.hash === key)
        setClickedUser(currentUser ? currentUser : undefined)
        setOwner(false)
    }else{
      setOwner(true)
    }

    if(user){
      setUsersList(users.filter(el => el.email !== user.email))
    }
  }, [location, users])
  

  return (
    <Container>
      <Header/>
      <Grid 
        container
        width='100%'
        height='100%'
        justifyContent={{
          xs: 'space-between',
          md: 'space-around'
        }}
        alignItems={{
          xs: 'center',
          md: 'flex-start'
        }}
        margin='100px 0'
        flexDirection={{
          xs: 'column',
          md: 'row'
        }}
        spacing={4}
      >
        {
          owner ? 
            <OwnerTodo likedTasks={likedTasks}/> : 
            <OtherTodoList user={clickedUser}/>}
        {
          liked ?
            <Users title='Task Liked' users={likedList} back={() => setLiked(false)}/>:
            <Users title='Other Users' users={usersList} back={() => setLiked(false)}/>
        }
      </Grid>
    </Container>
  )
}

export default Home