import React, { useContext, useEffect } from 'react'
import { AuthorContext } from '../context/authorContext'
import AuthorCard from '../components/AuthorCard'
import { useParams } from 'react-router-dom'



const AuthorPage = () => {

    const { authorKey } = useParams()
    const { authorInfo, getAuthorInfo, authorBooks, getAuthorBooks } = useContext(AuthorContext)
    
    useEffect(() => {
        getAuthorInfo()
        getAuthorBooks()
    }, [authorKey])



    return (
                
        <div style={{ margin: 'auto' }}>
            {authorInfo && authorWorks && authorBooks &&
                <AuthorCard authorInfo={authorInfo} authorWorks={authorWorks} authorBooks={authorBooks} />
            }
        </div>
            
    )
}

export default AuthorPage