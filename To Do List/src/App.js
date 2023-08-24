import { useEffect, useState } from 'react';
import AddItem from './AddItem';
import './App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {
  // const [items,setItems]=useState(JSON.parse(localStorage.getItem('todo_list')))
  const [search,setSearch]=useState('')
  const[items,setItems]=useState([])
  const API_URL='http://localhost:3500/items';
  const [newItem,setNewItem]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(true)

  useEffect(()=>{
    const fetchItems=async()=>{
      try{
        const response=await fetch(API_URL);
        if(!response.ok)throw Error("Data not Received");
        const listItems = await response.json();
        setItems(listItems)
        setFetchError(null)
      }catch(err){
        setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{
      (async()=>await fetchItems())()
    },2000)
  },[])

    // [
    //     {
    //         id:1,
    //         checked:true,
    //         item:"Java"
    //     },
    //     {
    //         id:2,
    //         checked:true,
    //         item:"React"
    //     },
    //     {
    //         id:3,
    //         checked:false,
    //         item:"python"
    //     },

    // ]
const handleCheck=async(id)=>{
    const listItems=items.map((item)=>
    item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)

    const myItem=listItems.filter((item)=>item.id===id);
    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,updateOptions)
    if(result)setFetchError(result)
}
const handleDelete=async(id)=>{
    const listItems=items.filter((item)=>item.id!==id)
    setItems(listItems)
    const deleteOptions={method:'DELETE'}
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,deleteOptions)
    if(result)setFetchError(result)
}
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!newItem)return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }
  const addItem=async(item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,item}
    const listItems=[...items,addNewItem]
    setItems(listItems)

    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result)setFetchError(result)
  }
  return (
    <div className='App'>
      <Header title="Guna"/>
      <AddItem newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
        />
        <main>
          {isLoading && <p>Loading items..</p>}
          {fetchError && <p>{`error:${fetchError}`}</p>}
      {!isLoading && !fetchError && <Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete} />}
        </main>
      <Footer 
      length={items.length}
      />
    </div>
  );
}

export default App;
