import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'

const initialFormVals = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

function EditMovie(props) {
    const {movieList, setMovieList} = props;
    const history = useHistory();
    const {id} = useParams();
    const [editedStar, setEditedStar] = useState('')
    const [editedMovie, setEditedMovie] = useState(initialFormVals)

    const changeHandler = event =>{
        const name=event.target.name;
        const value=event.target.value;
        setEditedMovie({
            ...editedMovie,
            [name]: value
        });
    };

    const starsChangeHandler = event =>{
        const newStars = [...editedMovie.stars]
        newStars.splice(event.target.id, 1, event.target.value)
        setEditedMovie({
            ...editedMovie,
            stars: newStars
        })
    }

    const submitEdit = event =>{
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, editedMovie)
        .then(res=>{
            console.log(res.data)
            const newMovieList = [...movieList]
            newMovieList.forEach((movie, index)=>{
                if (movie.id === id){
                    newMovieList.splice(index, 1, res.data)
                    setMovieList(newMovieList);
                }
            })
            history.push(`/`)
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            setEditedMovie(res.data)
        })
        .catch(err=>console.error(err));
    },[]);
    return(
        <form onSubmit={submitEdit}>
            <label>
                Title 
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    value={editedMovie.title}
                    onChange={changeHandler}
                />
            </label>
            <label>
                Director 
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    value={editedMovie.director}
                    onChange={changeHandler}
                />
            </label>
            <label>
                MetaScore
                <input
                    type='number'
                    name='metascore'
                    placeholder='metascore'
                    value={editedMovie.metascore}
                    onChange={changeHandler}
                />
            </label>
            <label>
                stars
                {editedMovie.stars.map((star, index)=>{
                    return(
                        <input
                        type='text'
                        name='stars'
                        id={index}
                        placeholder='star'
                        value={star}
                        onChange={starsChangeHandler}
                    />
                    )
                    
                })}
                
            </label>
            <button>Submit</button>
            
        </form>
    )
}

export default EditMovie;