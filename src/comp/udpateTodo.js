import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../Context/userContext';
import '../styles/updatetodopopup.scss'
import { MdCancelPresentation } from "react-icons/md";
const UpdateTodo = ({update,setunHide,id,setId}) => {
    const navigate = useNavigate();
    const {data,setData} = useContext(UserContext);
    const [newupdate,setNewupdate] = useState("");

    //getting username from url
    const {user} = useParams();

    //unblur the div code
    const unblurtodo = ()=>{
        document.getElementById("blurtodo").style.filter = "blur(0px)";
    }

    //setting the value to the setData from the localstorage
    useEffect(()=>{
        setNewupdate(update);
        const value= JSON.parse(localStorage.getItem("userstodo"));
        setData(value);
    },[update,setData])

    //update todo function:- where im handling three type of data updating one for name, one for priority updation
    //by checking the id (which is a date) and the normal todo and description

    //if the update value (which is actually a value to update) which we gets as props matches with the username
    //then update the name and save the data to the local storage and unblur the bg

    //if the update value and the id value is there then we must update the priority, because we are checking the priority with id
    //if the update value not matches with the name and there is no id provided then simply update the todo or desc
    const updateTodo = (e)=>{
        e.preventDefault();
        const mynameupdate = data.filter((ite)=>ite.name===update);
        const check = data.some((ite)=>ite.name===newupdate);
        if(mynameupdate.length>0){
        if(!check){
         for(let key of data){
        if(key.name===update){
            key.name=newupdate
        }}
        const updatedLocalStorageData = JSON.stringify([...data]);
        localStorage.setItem('userstodo', updatedLocalStorageData);
        navigate(`/${newupdate}`)
        setunHide(false)
        unblurtodo();
    }else{
        window.alert(`This user ${newupdate} already exists!`)
        unblurtodo();
    }
        }else if(id){
        let value = data.filter((ite)=>ite.name===user);
        value[0].userTodos.forEach((item)=>{          
                if(item['date']===id){
                    item['priority'] = newupdate;
                   }
            setId("");
        })
        setunHide(false);
        const updatedLocalStorageData = JSON.stringify([...data]);
        localStorage.setItem('userstodo', updatedLocalStorageData);
        unblurtodo();
        }
        else{
        let value = data.filter((ite)=>ite.name===user);
        value[0].userTodos.forEach((item)=>{
            for(let key in item){
                if(item[key]===update){
                    item[key] = newupdate;
                   }
            }
        })
        setunHide(false);
        const updatedLocalStorageData = JSON.stringify([...data]);
        localStorage.setItem('userstodo', updatedLocalStorageData);
        unblurtodo();
    }
}
  return (
    <div className='updateTodo-div'>
    <MdCancelPresentation size={'3rem'} onClick={()=>{setunHide(false);unblurtodo()}} fill='green' />
    <input type="text" name='newupdate' onChange={(e)=>setNewupdate(e.target.value)} value={newupdate}></input>
    <button onClick={updateTodo}>update now</button>
    </div>
  )
}

export default UpdateTodo