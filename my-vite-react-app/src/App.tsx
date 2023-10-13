import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  // aws gateway link.
  const link = '';
  let link_;

  const [buckets, setBuckets] = useState([]);
  const [objects, setObjects] = useState([]);
  const [object, setObject] = useState(null);
  const [backet, setBacket] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    link_ = (backet.length && key.length) ? `${link}?backet=${backet}&key=${key}` : backet.length ? `${link}?backet=${backet}` : `${link}`;
    axios.get(link_).then((resp: any) => {
      console.log(resp);
      (backet.length && key.length) ? setObject(resp) : backet.length ? setObjects(resp) : setBuckets(resp);
    }).catch((resp) => { console.log(resp); });
  }, [])
  return (
    <>
      <h1 style={{ color: 'grey' }}>Workshop 6</h1>
      <div>
        <h1 style={{ color: 'red' }}>buckets</h1>
        {
          buckets.length ?
            <select name="buckets">
              {
                buckets.map((buc) => { return <option value={buc}>{buc}</option> })
              }
            </select>
            : <h1>no buckets or you have an error in the aws gateway</h1>
        }
      </div>
      <div>
        <h1 style={{ color: 'red' }}>objectKeys</h1>
        {
          objects.length ?
            <select name="objectKeys">
              {objects.map((obj) => { return <option value={obj}>{obj}</option> })}
            </select>
            : <h1>no objects or none selected</h1>
        }
      </div>
      <div>
        {
          object &&
          <div>
            <h1>Selected Object</h1>
            {object}
          </div>
        }
      </div>
    </>
  )
}

export default App
