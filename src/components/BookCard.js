import React, { useState, useContext, useEffect } from 'react'
import { BookContext } from '../context/bookContext'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import DetailsIcon from '@material-ui/icons/Details'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import AddRemoveBookButton from './AddRemoveBookButton'




const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    // media: {
    //   height: 0,
    //   paddingTop: '56.25%', // 16:9
    // },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}))

const flexContainer = { display: 'flex', flexDirection: 'column' }




const BookCard = () => {

    let { authorKey, bookKey } = useParams()
    const { getMergedBookInfoController, mergedBookInfo } = useContext(BookContext)
    const { user } = useContext(AuthContext)

    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)


    useEffect(() => {
        getMergedBookInfoController(bookKey)
    }, [bookKey])

    console.log('mergedBookInfo:', mergedBookInfo)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (

        <div style={flexContainer}>
            {mergedBookInfo ?
                <Card className={classes.root}>
                    <CardHeader
                        // action={
                        //     <IconButton aria-label="go to ia-page">
                        //         <Link href={`https://openlibrary.org/${workInfo?.key}`}>
                        //             <OpenInNewIcon />
                        //         </Link>
                        //     </IconButton>
                        // }
                        title={mergedBookInfo?.title}
                        subheader={`${mergedBookInfo?.first_publish_year}`}
                    />

                    <CardMedia className={classes.media} title='book cover'>
                        <img src={`https://covers.openlibrary.org/b/id/${mergedBookInfo?.cover_i}-L.jpg`} alt='' />
                    </CardMedia>

                    {/* <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {authorInfo?.bio?.value || "no text"}
                    </Typography>
                </CardContent> */}


                    <CardActions disableSpacing>
                        {!user ?
                            <Link to={'/login'}>
                                <IconButton aria-label='add favourite' value='check'>
                                    <AddIcon />
                                </IconButton>
                            </Link>
                            :
                            <AddRemoveBookButton mergedBookInfo={mergedBookInfo} />
                        }
                        <IconButton aria-label='author info' endIcon={<DetailsIcon />}>
                            <Link to={`/authors/${authorKey}`}>
                                see author details
                            </Link>
                        </IconButton>
                        <div>
                            {mergedBookInfo?.description &&
                                <IconButton
                                    className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label='show more'
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            }
                        </div>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {/* <Typography paragraph>Method:</Typography> */}
                            <Typography paragraph>
                                {mergedBookInfo?.description?.value || mergedBookInfo?.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                :
                <Typography>loading...</Typography>
            }
        </div>
    )
}

export default BookCard