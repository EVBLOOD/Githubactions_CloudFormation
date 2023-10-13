import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  // aws gateway link.
  const link = 'https://1nnjgw5pva.execute-api.us-east-1.amazonaws.com/dev/api';

  let link_; // link to fetch with

  const [buckets, setBuckets] = useState([]); // buckets in aws console
  const [objects, setObjects] = useState([]); // objects inside the selected bucket
  const [object, setObject] = useState(""); // the object fetched from the bucket&key
  const [backet, setBacket] = useState(""); // selected bucket
  const [key, setKey] = useState(""); // selected object key

  useEffect(() => {
    setObject("")
    link_ = (backet.length && key.length) ? `${link}?bucket=${backet}&key=${key}` : backet.length ? `${link}?bucket=${backet.toString()}` : `${link}`;
    console.log(link_);
    axios.get(link_).then((resp: any) => {
      console.log(resp);
      console.log("loop");
      (backet.length && key.length) ? setObject(resp.data) : backet.length ? setObjects(resp.data.substring(1, resp.data.length - 1).split(',')) : setBuckets(resp.data.substring(1, resp.data.length - 1).split(','));
      setBacket("")
      setKey("")
    }).catch((resp) => { console.log(resp); });
  }, [backet, key])
  return (
    <>
      <h1 style={{ color: 'grey' }}>Workshop 6</h1>
      <div>
        <h1 style={{ color: 'red' }}>buckets</h1>
        {
          buckets.length > 0 ?
            <select name="buckets" onChange={(event) => setBacket(event.target.value)}>
              {
                buckets.map((buc: string) => { return <option key={buc.trim().substring(1, buc.trim().length - 1)} value={buc.trim().substring(1, buc.trim().length - 1)}>{buc.trim().substring(1, buc.trim().length - 1)}</option> })
              }
            </select>
            : <h1>no buckets or you have an error in the aws gateway</h1>
        }
      </div>
      <div>
        <h1 style={{ color: 'red' }}>objectKeys</h1>
        {
          objects.length > 0 ?
            <select name="objectKeys" onChange={(event) => setKey(event.target.value)}>
              <option value=""></option>
              {objects.map((obj: string) => { return <option key={obj.trim().substring(1, obj.trim().length - 1)} value={obj.trim().substring(1, obj.trim().length - 1)}>{obj.trim().substring(1, obj.trim().length - 1)}</option> })}
            </select>
            : <h1>no objects or none selected</h1>
        }
      </div>
      <div>
        {
          object && JSON.stringify(object)
        }
      </div>
    </>
  )
}

export default App
