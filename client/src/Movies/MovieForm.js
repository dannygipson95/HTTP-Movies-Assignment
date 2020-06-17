import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'

const initialFormVals = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

function EditMovie() {
    const history = useHistory();
    const {id} = useParams();
    const [editedMovie, setEditedMovie] = useState(initialFormVals)

    const changehandler = event =>{
        const name=event.target.name;
        const value=event.target.value;

        // if(name === star){
        //     setEditedMovie({
        //         ...editedMovie,
        //         stars: [stars.filter((star, index)=>{
        //             star.id !== 
        //         })]
        //     })
        // }

        setEditedMovie({
            ...editedMovie,
            [name]: value
        });
    };

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            setEditedMovie(res.data)
        })
        .catch(err=>console.error(err));
    },[]);
    return(
        <form>
            <label>
                Title 
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    value={editedMovie.title}
                    onChange={changehandler}
                />
            </label>
            <label>
                Director 
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    value={editedMovie.director}
                    onChange={changehandler}
                />
            </label>
            <label>
                MetaScore
                <input
                    type='number'
                    name='metascore'
                    placeholder='metascore'
                    value={editedMovie.metascore}
                    onChange={changehandler}
                />
            </label>
            <label>
                stars
                {editedMovie.stars.map((star, index)=>{
                    return(
                        <>
                            <input
                                type='text'
                                name='star'
                                placeholder='star'
                                value={star}
                                onChange={changehandler}
                            />
                        </>
                    )
                })}
                
            </label>
            
        </form>
    )
}

export default EditMovie;