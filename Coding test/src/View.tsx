import { useState } from 'react';

function View() {
  const [balance, setBalance] =useState(0);
  const [textBoxValue,setTextBoxValue] = useState("")
const [result,setResult] = useState<{
  time: string;
  amount: number;
  type: string;
}[]>([])

const handleAdd = () => {
  var date = Date();
  setResult(prev => [...prev, {
    time:Date().toLocaleString(),
    amount:  parseInt(textBoxValue),
    type: "ADD"
  }
])
  setBalance(balance+ parseInt(textBoxValue))}
const handleRemove = ()=> {
  setResult(prev => [...prev, {
    time:Date().toLocaleString(),
    amount:  parseInt(textBoxValue),
    type: "Remove"
  }
])
  setBalance(balance - parseInt(textBoxValue))}


  return ( 
    <>
    <div>View</div>
    <div>
      <p>BALANCE:{balance}</p>
<input type="number" id="quantity" name="quantity" min="1" max="1000000" onChange={(e)=>{setTextBoxValue(e.target.value);}}/>
    </div>
      <div>
        <button type="submit" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleRemove}>remove</button>
        </div>
        {
          result.map((transaction,index)=> {
            return (
              <div key={index}>
                {transaction.time} {transaction.amount} {transaction.type}
              </div>
            )
          })
        }

    </>
    
  )
}

export default View