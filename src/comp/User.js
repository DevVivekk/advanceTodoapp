import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UpdateTodo from './udpateTodo';
import UserContext from '../Context/userContext';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import '../styles/updatetodo.scss'
import { MdNavigateNext } from "react-icons/md";
import {IoIosArrowBack} from 'react-icons/io'
const User = () => {

    //getting username from url
    const {user} = useParams();

  const {data,setData} = useContext(UserContext); //getting states values from the context api and later adding values
  //from local storage

  const [unhide,setunHide] = useState(false); //hiding and unhiding div
  const [update,setUpdate] = useState(""); //will be sent as prop, it is the value which should be updated
  const [id,setId] = useState(""); //here adding the date string value as id
  const [page,setPage] = useState(1); //page number for pagination
  const [todosvalue,setTodosValue] = useState([]) //FOR PAGINATION PURPOSE
  const [sorting,setSorting] = useState(""); //for sorting the todo


  useEffect(()=>{
    const dataa = JSON.parse(localStorage.getItem("userstodo"));
    setData(dataa);
    const userspecifitodo = dataa.filter((ite)=>ite.name===user);
    setTodosValue(userspecifitodo[0].userTodos)
  },[setData,setTodosValue,user])

  const blurtodo = ()=>{
    document.getElementById("blurtodo").style.filter = "blur(8px)";
}
  const handleView = (item,item2)=>{
    blurtodo()
    setUpdate(item);
    setId(item2);
    setunHide(true)
  }


  //function to delete the todo
  const handleDeleteTodo = (deltodo)=>{
    let value = data.filter((ite)=>ite.name===user);
        const newtodo = value[0].userTodos.filter((item)=>item.todos!==deltodo)
        value[0].userTodos = newtodo;
        const updatedLocalStorageData = JSON.stringify([...data]);
        localStorage.setItem('userstodo', updatedLocalStorageData);
        setData([...data]);
  }

//check todo funtion, here im first getting  the todo array of the respective user and then
//appyling the for each loop to get all the todos object from the array and then for in loop
//to check which todo matches with the newupdate parameter value if it matches the strike value true.
  const checktodo = (newupdate)=>{
    let value = data.filter((ite)=>ite.name===user);
    value[0].userTodos.forEach((item)=>{
        for(let key in item){
            if(item[key]===newupdate){
                item['strike'] = true;
               }
        }
    })
    const updatedLocalStorageData = JSON.stringify([...data]);
    localStorage.setItem('userstodo', updatedLocalStorageData);
    setData([...data]);
}

//uncheck todo funtion, here im first getting  the todo array of the respective user and then
//appyling the for each loop to get all the todos object from the array and then for in loop
//to check which todo matches with the newupdate parameter value if it matches the strike value false.

const unchecktodo = (newupdate)=>{
  let value = data.filter((ite)=>ite.name===user);
  value[0].userTodos.forEach((item)=>{
      for(let key in item){
          if(item[key]===newupdate){
              item['strike'] = false;
             }
      }
  })
  const updatedLocalStorageData = JSON.stringify([...data]);
  localStorage.setItem('userstodo', updatedLocalStorageData);
    setData([...data]);
}

//pagination
const Onpage = ()=>{
  if(page===Math.ceil(todosvalue.length/1)){
   return Math.ceil(todosvalue.length/1)
  }else{
   setPage(page+1)
  }
}
const Onpageprev = ()=>{
   if(page===1){
       return page
   }
   setPage(page-1)
}
  return (
    <div className='update-todo-div-show-popup'>
    <div id='blurtodo' className='update-todo-div'>
    <select onChange={(e)=>setSorting(e.target.value)}>
    <option value={""}>Sort todo</option>
    <option value={'new'}>New</option>
    <option value={'old'}>Old</option>
    </select>
    {
      data && data.map((item,index)=>{
        return(
          <div key={index}>
            {item.name===user?
            <>
            <div className='my-div-todo'><h2>UserName:- {item.name}</h2><MdEdit style={{"marginLeft":"3rem"}} size={'2rem'} onClick={()=>handleView(item.name)}>Update</MdEdit></div>
            <ul>
                {sorting==='new'?item.userTodos.concat().reverse().slice(page*1-1,page*1).map((ite,inde)=>{
                  return(
                    <div className='main-todo-div' key={inde}>
                    <div className='my-div-todo'><li style={ite.strike?{"textDecoration":"line-through"}:null}>Todo: {ite.todos}</li><MdEdit size={'2rem'} onClick={()=>handleView(ite.todos)}>Update</MdEdit></div>
                    <div className='my-div-todo'><p>Description: {ite.desc}</p><MdEdit size={'2rem'} onClick={()=>handleView(ite.desc)}>Update</MdEdit></div>
                    <div className='my-div-todo'><p>Priority: {ite.priority}</p><MdEdit size={'2rem'} onClick={()=>handleView(ite.priority,ite.date)}>Update</MdEdit></div>
                    <div className='my-div-todo'>
                    <MdDelete size={'3rem'} color='red' onClick={()=>handleDeleteTodo(ite.todos)}>Delete Todo</MdDelete>
                    <CiSquareCheck onClick={()=>checktodo(ite.todos)} size={'4rem'} />
                    <ImCross onClick={()=>unchecktodo(ite.todos)} size={'2.5rem'} />
                    </div>
                    <div className='my-div-todo'><p>Todo Added: {new Date(ite.date).toLocaleString()}</p></div>
                    </div>
                  )
                })
                :item.userTodos.slice(page*1-1,page*1).map((ite,inde)=>{
                  return(
                    <div className='main-todo-div' key={inde}>
                    <div className='my-div-todo'><li style={ite.strike?{"textDecoration":"line-through"}:null}>Todo: {ite.todos}</li><MdEdit size={'2rem'} onClick={()=>handleView(ite.todos)}>Update</MdEdit></div>
                    <div className='my-div-todo'><p>Description: {ite.desc}</p><MdEdit size={'2rem'} onClick={()=>handleView(ite.desc)}>Update</MdEdit></div>
                    <div className='my-div-todo'><p>Priority: {ite.priority}</p><MdEdit size={'2rem'} onClick={()=>handleView(ite.priority,ite.date)}>Update</MdEdit></div>
                    <div className='my-div-todo'>
                    <MdDelete size={'3rem'} color='red' onClick={()=>handleDeleteTodo(ite.todos)}>Delete Todo</MdDelete>
                    <CiSquareCheck onClick={()=>checktodo(ite.todos)} size={'4rem'} />
                    <ImCross onClick={()=>unchecktodo(ite.todos)} size={'2.5rem'} />
                    </div>
                    <div className='my-div-todo'><p>Todo Added: {new Date(ite.date).toLocaleString()}</p></div>
                    </div>
                  )
                })
                }
            </ul>
            </>:null}
          </div>
        )
      })
    }
    <div className={'pagination-div'}>
    <IoIosArrowBack size={'3.5rem'} onClick={Onpageprev}></IoIosArrowBack>
    <p>Todo Count:- {page}/{Math.ceil(todosvalue&&todosvalue.length/1)}</p>
    <MdNavigateNext size={'4.5rem'} onClick={Onpage}></MdNavigateNext>
    </div>
    </div>
    {
      unhide?<UpdateTodo setunHide={setunHide} setId={setId} id={id} update={update} />:null
    }
    </div>
  )
}

export default User