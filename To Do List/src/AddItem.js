import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItem=({newItem,setNewItem,handleSubmit})=>{
    const inputRef=useRef()
    return(
        <form className='addform' onSubmit={handleSubmit}>
            <label html for="additem">AddItem</label>
            <input 
                autoFocus
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='AddItem'
                required
                value={newItem}
                onChange={(e)=>setNewItem(e.target.value)}
                />
            <button
            type='submit'
            aria-label='AddItem'
                onClick={()=>inputRef.current.focus()}>
            <FaPlus />
            </button>
        </form>
    )
}
export default AddItem