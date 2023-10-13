import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  // aws gateway link.
  const link = 'https://1nnjgw5pva.execute-api.us-east-1.amazonaws.com/dev/api';

  let link_; // link to fetch with

  const [buckets, setBuckets] = useState<string[]>([]); // buckets in aws console
  const [objects, setObjects] = useState<string[]>([]); // objects inside the selected bucket
  const [object, setObject] = useState(""); // the object fetched from the bucket&key
  const [backet, setBacket] = useState(""); // selected bucket
  const [key, setKey] = useState(""); // selected object key

  function helperToArray(target: String): string[] {
    return target.substring(1, target.length - 1).split(',')
  }
  function helperToValidName(target: String): string {
    return target.trim().substring(1, target.trim().length - 1)
  }

  useEffect(() => {
    setObject("")
    link_ = (backet.length && key.length) ? `${link}?bucket=${backet}&key=${key}` : // if I have both the bucketname and Objectkey I'll get that object..
      backet.length ? `${link}?bucket=${backet.toString()}` : // if I have only the bucketname I'll get only the Objects names of that bucket
        `${link}`; // if I don't have none, I'll just get a list if my aws buckets
    // here I fetch data from the apiGateway
    axios.get(link_).then((resp: any) => {
      console.log(resp);
      console.log("loop");
      (backet.length && key.length) ? setObject(resp.data) : // an object body 
        backet.length ? setObjects(helperToArray(resp.data)) // a bucket object names
          : setBuckets(helperToArray(resp.data)); // bucket names
      setBacket("")
      setKey("")
    }).catch((resp) => {
      console.error(resp);
    });
  }, [backet, key])



  return (
    <>
      <h1 style={{ color: 'grey' }}>Workshop 6</h1>
      <div>
        <h1 style={{ color: 'red' }}>buckets</h1>
        {
          buckets.length > 0 ?
            <select name="buckets"
              onChange={(event) => setBacket(event.target.value)}>
              <option value=""></option>
              {
                buckets.map((buc: string) => {
                  return <option key={helperToValidName(buc)} value={helperToValidName(buc)}>{helperToValidName(buc)}
                  </option>
                })
              }
            </select>
            : <h1>no buckets or you have an error in the aws gateway</h1>
        }
      </div>
      <div>
        <h1 style={{ color: 'red' }}>objectKeys</h1>
        {
          objects.length > 0 ?
            <select name="objectKeys"
              onChange={(event) => setKey(event.target.value)}>
              <option value=""></option>
              {
                objects.map((obj: string) => {
                  return <option key={helperToValidName(obj)} value={helperToValidName(obj)}>{helperToValidName(obj)}</option>
                })
              }
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
