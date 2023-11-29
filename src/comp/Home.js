import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/userContext'
import '../styles/homestyles.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from 'react-router-dom'
const Home = () => {
  const { setData, data } = useContext(UserContext);
  const [todo, setTodo] = useState({ todos: '', desc: '', priority: '', strike:false, date:new Date().toString()});
  //name field will be handled seperately
  const [name, setName] = useState('');


  //addig the values to the todo state
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodo({ ...todo, [name]: value });
  };

  //setting the name value from local storage if it exists
  useEffect(()=>{
   if(localStorage.getItem("myname")){
    setName(localStorage.getItem("myname"));
   }
  },[])

  //todo submission with some checks. If the user exists just push the todos to the existing todo array 
  //and if users doesn't exists simply add the todo in the todos array and set them in localstorage
  const handleClick = (e) => {
    if(!name || !todo.todos || !todo.desc){
      toast.error("Please specify your name and other details!")
    }else{
    e.preventDefault();
    console.log(todo);
    const existingUserIndex = data.findIndex((user) => user.name === name);
    if (existingUserIndex !== -1) {
      // User with the same name already exists, update their todos
      const updatedData = [...data];
      updatedData[existingUserIndex].userTodos.push(todo);
      setData(updatedData);
      setTodo({todos:"",desc:"",priority:"",strike:""})
      localStorage.setItem("myname",name)
      toast.success("Todo added successfully!!")
    } else {

      ///////IGNORE THIS LINE CODE/////////////
    // setUserTodos((prevUserTodos) => {
    //   const updatedUserTodos = [...prevUserTodos, todo];
    //   return updatedUserTodos;
    // });
    ///////IGNORE THIS LINE CODE/////////////

    setData((prevData) => [...prevData, { name, userTodos: [todo] }]);
    setTodo({todos:"",desc:"",priority:"",strike:""})
    localStorage.setItem("myname",name)
    toast.success("Todo added successfully!!")
  }
}
};
  useEffect(()=>{
       const updatedLocalStorageData = JSON.stringify([...data]);
       localStorage.setItem('userstodo', updatedLocalStorageData);
  },[data])
  return (
    <div className={'todos-home'}>
      <h1>Hey user add your todos here....👇</h1>
      <input value={name} onChange={(e)=>setName(e.target.value)} type='text' name='name' placeholder='enter name' />
      <input value={todo.todos} onChange={handleChange} type='text' name='todos' placeholder='enter todo' />
      <input value={todo.desc} onChange={handleChange} type='text' name='desc' placeholder='enter description' />
     <select value={todo.priority} onChange={handleChange} name='priority'>
      <option value={""}>Choose priority</option>
      <option value={"high"}>High</option>
      <option value={"medium"}>Medium</option>
      <option value={"low"}>Low</option>
     </select>
     <button onClick={handleClick}>Submit</button>
     {name?<NavLink className={'todo-link'} to={`/${name}`}>My todo list page</NavLink>:null}
     <ToastContainer position='top-center' style={{"fontSize":"1.5rem","fontFamily":"Arial","fontWeight":"600"}}  />
    </div>
  )
}

export default Home