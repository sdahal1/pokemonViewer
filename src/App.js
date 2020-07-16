import React , {useState, useEffect} from 'react';
import './App.css';
// import Example from './components/Example';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
// import { useEffect } from 'react';

function App() {

  const [pokeList, setPokelist] = useState([]);
  const [todisplay, setTodisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [pokedetails, setPokedetails] = useState({name: "...", sprites: []})



  const getPokemon = e=> {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(res => {
        console.log(res.data.results)
        setPokelist(res.data.results);
        setTodisplay(res.data.results)
      })
      .catch(err=> console.log(err));
  }

  const getDetails = pokemon => {
    console.log('in get details function')
    console.log(pokemon)
    axios.get(pokemon.url)
      .then(res => {
        console.log("logging results from pokemon url get request api call")
        console.log(res.data)
        setPokedetails(res.data)
        
      })
      .catch(err=> console.log(err));
  }

  useEffect( () => {
      console.log("hi")
      getPokemon();
  }, [])

  useEffect( () => {
    
    setTodisplay(pokeList.filter(p => p.name.includes(search)));
}, [search])



  return (
    <>
      {/* <Example></Example> */}
      <div className="container">
        <div className="jumbotron">
          <h1>Pokemon are neat</h1>
        </div>
        {/* <button className="btn btn-primary">Get Pokemon</button> */}
        <div className="row">
          <div className="col-sm-8">
              <div className="form-group">
                <input type="text" className="form-control" onChange = {e=>setSearch(e.target.value)} placeholder= "Search for a pokemon"/>     
              </div>

              <ul className="list-group is-scrollable">
                {todisplay.map( (pokemon, i ) =>
                  <li key = {i} className="list-group-item" onClick = {e=> getDetails(pokemon)}>{pokemon.name}</li>
              )}
              </ul>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="cart-header bg-dark text-light">{pokedetails.name}</div>
              <div className="card-body">
                <img src={pokedetails.sprites.front_default} alt="" width= '192px' height = '192px' />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
    
  );
}

export default App;
