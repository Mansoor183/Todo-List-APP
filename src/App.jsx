import React,{useState,useEffect} from 'react'
import './App.css'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import { db } from './firebase'
import { query,collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style= {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
   heading: `text-3xl font-bold text-center text-grey p-2`,
   form: `flex justift-between`,
   input:`border p-2 w-full text-xl`,
   button:`border p-4 ml-2 bg-purple-500 text=slate-100`,
   count:`text-center p-2`
}

function App() {
  const [todos,setTodos]=useState([])
  const [input,setInput]=useState('')

  //Create Todo
  const createTodo= async (e) => {
    e.preventDefault(e)
    if(input===''){
      alert('Please Enter a Valid Todo')
      return
    }
    await addDoc(collection(db, 'todos'),{
      text: input,
      completed: false,
    })
    setInput('')
  }
  //Read Todo
  useEffect(()=>{
    const q=query(collection(db,'todos'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot)=>{
      let todosArr=[]
      QuerySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return()=> unsubscribe()
  },[])

  //Update Todo
  const toggleComplete= async (todo) => {
    await updateDoc(doc(db,'todos',todo.id),{
      completed: !todo.completed
    })
  }
  //Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db,'todos',id))
  }
  // Update Todo Item
const updateTodo = async (updatedTodo) => {
  await updateDoc(doc(db, 'todos', updatedTodo.id), {
    text: updatedTodo.text,
  }); 
};


  return (
    <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App</h3>
          <form onSubmit={createTodo} className={style.form}>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder='Add Todo'/>
            <button className={style.button}><AiOutlinePlus size={30} /></button>
          </form>
          <ul>
            {todos.map((todo, index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
            ))}
            
          </ul>

          {todos.length<1 ? null : <p className={style.count}>{`You Have ${todos.length} todos`}</p> }
      
        </div>
    </div>
  )
}

export default App
