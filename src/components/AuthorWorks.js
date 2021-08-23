import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'




const AuthorWorks = ({ authorWorks }) => {

    const { authorKey } = useParams()
    const [bookInfo, setBookInfo] = useState()
    const [selectedTitle, setSelectedTitle] = useState('')


    useEffect(() => {
        selectedTitle && console.log('selectedTitle:', selectedTitle)
        const getBookInfo = async (selec) => {
            const response = await fetch(`https://cab-cors-anywhere.herokuapp.com/https://openlibrary.org/search.json?title=${selec}`)
            const obj = await response.json()
            console.log('obj.docs:', obj.docs)
            setBookInfo( obj?.docs.filter(item => {
                return item?.author_key[0] === authorKey 
            }))
        }
        getBookInfo(selectedTitle)
    }, [])


    // console.log('bookInfo:', bookInfo)
    // console.log('authorKey:', authorKey)
    // console.log('authorWorks:', authorWorks)

    return (

        <div style={{ margin: 'auto' }}>

            <List>
                { 
                    authorWorks?.map(item => 
                        <ListItem key={item} onClick={setSelectedTitle(item.title)}>
                            {bookInfo && 
                                <Link to={`/books/${bookInfo?.cover_edition_key}`}>
                                <img src={`http://covers.openlibrary.org/b/id/${bookInfo?.cover_i}-M.jpg`} alt={`cover photo`} />
                                </Link>
                            }
                        </ListItem>
                    )
                }
            </List>
        </div>
    )

}
export default AuthorWorks

