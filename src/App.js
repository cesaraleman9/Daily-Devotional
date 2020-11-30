import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [devotional, setDevotional] = useState(undefined);
  const [isLoaded, setIsLoaded]     = useState(undefined);
  const [error, setError]           = useState(undefined);

  useEffect(() => {
    axios.get('https://devotionals-api.herokuapp.com/api/v1/devotionals/today')
    .then(({ data }) => setDevotional(data[0]))
    .catch((err) => setError(err))
    .finally(() => setIsLoaded(true));
  }, []);

  if(error)
    return (
      <div className="App">
        <h1>Ocurrió un error ...</h1>
        <p>Error: {error.message}</p>
      </div>
    )
  else if(!isLoaded)
    return (
      <div className="App">
        <h1 className="loading">Cargando ...</h1>
      </div>
    )
  else
    return (
      <div className="App">
        <Devotional data={devotional}/>
      </div>
    )

}

function Devotional({ data }){
  return (
    <div className="devotional">
      <p className="date">{data.date}</p>
      <h1 className="title">{data.title}</h1>
      <p className="verse">{data.vers}</p>
      <div className="content">
        {data.content.map((paragraph, index) => <p key={index}>{paragraph}</p> )}
      </div>
    </div>
  );
}

export default App;
