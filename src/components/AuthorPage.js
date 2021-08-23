import React, { useState, useEffect } from 'react'
import AuthorCard from './AuthorCard'
import AuthorWorks from './AuthorWorks'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import IconButton from '@material-ui/core/IconButton'


const AuthorPage = () => {

    const { authorKey } = useParams()
    const [authorInfo, setAuthorInfo] = useState()
    const [authorWorks, setAuthorWorks] = useState()
    console.log('authorKey:', authorKey)


    const getAuthorWorks = async () => {
        const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}/works.json?limit=30`)
        const obj = await response.json()
        console.log('obj.entries:', obj?.entries)
        obj && setAuthorWorks(obj.entries)
    }

    const handleClick = () => {
        setAuthorWorks(getAuthorWorks())
        authorWorks && console.log('authorWorks:', authorWorks)
    }

    useEffect(() => {
        const getAuthorInfo = async () => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/authors/${authorKey}.json`)
            const obj = await response.json()
            console.log('obj:', obj)
            setAuthorInfo(obj)
        }
        getAuthorInfo()
    }, [])


    return (
                
            <div style={{ margin: 'auto' }}>
                
                <AuthorCard authorInfo={authorInfo}>
                    <IconButton aria-label="show all books" onClick={handleClick}>
                        {authorWorks && 
                            <Link to={`/authors/${authorKey}/works`}>
                                <ShareIcon />
                                <Paper>
                                    <AuthorWorks authorWorks={authorWorks} />
                                </Paper>
                            </Link>
                        }
                    </IconButton>
                </AuthorCard> 
                
            </div>
            
    )
}

export default AuthorPage