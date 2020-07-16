import React, {useState, useEffect} from 'react';

const Example = (props) => {
    const [state, setState] = useState(0);

    useEffect(()=>{
        console.log("hello")
        fetch('https://swapi.dev/api/people/')
            .then(response=>{
                console.log("logging response.json below")
                console.log(response)
                let responsegotten = response.json()
                console.log(responsegotten)
                return responsegotten
            })
            .then(response =>{
                console.log('logging response')
                console.log(response)
                setState({
                    people: response.results
                })
            })
            .catch(
                error => console.log(error)
            )
    }, [])

    return (
        <div>
            {state.people ? state.people.map((item, index)=>{
                return(<div key ={index}>{item.name}</div>)
            }): null}
        </div>
    )
}

export default Example;