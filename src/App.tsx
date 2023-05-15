import React from "react";
import "./App.css";
import TodoList from "./components/todo_list";
import TodoHeader from "./components/todo_header";
import { getDatabase, ref, get, push, update, remove } from "firebase/database";
import { Box, Typography } from "@mui/material";

export type taskType = {
  id: number,
  text: string,
  hash?: string
}

const App = () => {
  const [todoList, setTodoList] = React.useState<Array<taskType>>([])

  const database = getDatabase();


  const [task, setTask] = React.useState<taskType | null>(null)


  function saveTask(){
    if(task){
      const currentTaskIndex = todoList.findIndex(el => el.id === task.id)
      // add new task to db
      // -1 is if we didnt create task  before
      if(currentTaskIndex === -1){
        push(ref(database, 'tasks'), task)
          .then(() => {
            setTodoList(state => [...state, task])
            console.log("Data was successfully added to the database");
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        // update the task on db
        const todoRef = ref(database, `tasks/${task.hash}`);
        update(todoRef, task)
        .then(() => {
          const newTodoList = [...todoList]
          newTodoList[currentTaskIndex] = task
          setTodoList(newTodoList)
        });

      }
    }
  }



  function deleteTask (id:number){
    const hash = todoList.filter(el => el.id === id)[0].hash
    const dataRef = ref(database, "tasks/" + hash);

    // delete task from db
    remove(dataRef)
      .then(() => {
        console.log("Data successfully removed.");
        setTodoList(state => state.filter(el => el.id !== id))
      })
      .catch((error) => {
        console.error(error);
      });

  }

  function deleteAll(){
    const dataRef = ref(database, "tasks/");

    // delete task from db
    remove(dataRef)
      .then(() => {
        console.log("Data successfully removed.");
        setTodoList([])
      })
      .catch((error) => {
        console.error(error);
      });

  }



  function editTask(id: number){
    const editTask = todoList.filter(el => el.id === id)[0]
    setTask(editTask ? editTask : null)
  }


  React.useEffect(() => {

    // get todolist from db
    const todoRef = ref(database, "tasks");
    get(todoRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const todoValues: Array<taskType> = Object.values(snapshot.val())
        const todoHash: Array<string> = Object.keys(snapshot.val())
        
        // put hash key from db to todoList
        const newTodoList = todoValues.map((el, index) => {
          el.hash = todoHash[index]
          return el 
        })

        setTodoList(newTodoList)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }, [])
  

  return (
    <Box 
      sx={{
        width: 500,
        height: '100%',
        backgroundColor: 'rgb(255, 255, 255)',
        margin: '100px auto',
        padding: '20px',
        borderRadius: 2
      }}
    >
      <Typography mb={2} variant="h3" lineHeight="lg" textAlign='center'>
        To Do list
      </Typography>

      <TodoHeader saveTask={saveTask} setTask={setTask} task={task} listLength={todoList.length} deleteAll={deleteAll}/>

      <TodoList list={todoList} deleteTask={deleteTask} editTask={editTask}/>
    </Box>
  );
};

export default App;
