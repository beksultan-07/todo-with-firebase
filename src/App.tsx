import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { get, getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import { useDispatch } from 'react-redux'
import { UserType } from "./components/auth_register";
import { setUser, setUsers } from "./store/actions/users";
import { likedTask, taskType } from "./components/owner_todo";

const App = () => {

  const auth = useSelector((state: RootState) => state.auth.auth) 
  const userEmail = useSelector((state: RootState) => state.auth.email) 
  const dispatch = useDispatch()

  const nav = useNavigate()

  const database = getDatabase();

  function saveToRedux(snapshot: DataSnapshot){
    const usersValues: Array<UserType> = Object.values(snapshot.val())
    const usersHash: Array<string> = Object.keys(snapshot.val())
    
    const newUsers = usersValues.map((el, index) => {
      el.hash = usersHash[index]
      
      if(el.tasks){
        const todoValues: Array<taskType> = Object.values(el.tasks)
        const todoHash: Array<string> = Object.keys(el.tasks)
        
        const newTodo = todoValues.map((el, index) => {
          el.hash = todoHash[index]


          if(el.liked){
            const todoLikedValues: Array<likedTask> = Object.values(el.liked)
            const todoLikedHash: Array<string> = Object.keys(el.liked)
            
            const newTodoLiked = todoLikedValues.map((el, index) => {
              el.likedHash = todoLikedHash[index]
              return el 
            })
            el.liked = newTodoLiked 
          }else{
            el.liked = []
          }


          return el 
        })
        el.tasks = newTodo 
      }

      
      return el 
    })

    const newUser = newUsers.find(el => el.email === userEmail) || null

    dispatch(setUsers(newUsers))
    dispatch(setUser(newUser))
  }


  React.useEffect(() => {
    if(auth){
      nav('/')

      const dataRef = ref(database, 'users');
  
      const handleDataChange = (snapshot: DataSnapshot) => {
        saveToRedux(snapshot)
      };
  
      onValue(dataRef, handleDataChange);

      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            saveToRedux(snapshot)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

    }else{
      nav('/auth')
    }
  }, [auth])


  return (
    <Routes>
      <Route path='*' element={ <Home /> }/>
      <Route path='/auth' element={ <Auth /> }/>
    </Routes>
  );
};

export default App;
