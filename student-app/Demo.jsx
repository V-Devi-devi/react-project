import { useState } from "react";
function Demo() {
  const[count,setCount]=useState(10)
  const increment=()=>setCount(count+1);
  const decrement=()=>{
    if(count==0)return;
    setCount(count-1);
  };

  return (
    <div>
      <p>Count:{count}</p>
      <button onClick={increment}>Increment</button>
      <button on onClick={decrement}disabled={count==0}>Decrement</button>
      
    </div>
  );
}

export default Demo;