import React, { useState, useContext, useEffect } from 'react'
import { BookContext } from '../context/bookContext'
import { UserListsContext } from '../context/userListsContext'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// import { checkPropTypes } from 'prop-types';


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
    },
    avatar: {
        backgroundColor: red[500],
    },
}))


const BookCard = () => {

    let { authorKey, bookKey } = useParams()
    let { bookInfo, getBookInfo, workInfo } = useContext(BookContext)
    const { addBookToList, removeBookFromList } = useContext(UserListsContext)

    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState(false)



    useEffect(() => {
        getBookInfo(bookKey)
    }, [bookKey])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleSelected = () => {
        !selected ? addBookToList(bookInfo, workInfo) && setSelected(true)
            : removeBookFromList(bookInfo, workInfo) && setSelected(false)
    }



    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="book" className={classes.avatar}>
                        {workInfo?.subjects || bookInfo?.subject}
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="go to ia-page">
                //         <Link href={`https://openlibrary.org/${workInfo?.key}`}>
                //             <OpenInNewIcon />
                //         </Link>
                //     </IconButton>
                // }
                title={workInfo?.title}
                subheader={`${bookInfo?.first_publish_year}`}
            />
            <CardMedia className={classes.media} title="book cover">
                <img src={`https://covers.openlibrary.org/b/id/${bookInfo?.cover_i}-L.jpg`} alt='' />
            </CardMedia>
            {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {authorInfo?.bio?.value || "no text"}
        </Typography>
      </CardContent> */}

            <CardActions disableSpacing>
                <IconButton aria-label="add to favourites"
                    value="check"
                    // selected={selected}
                    // onChange={() => {
                    // setSelected(!selected)
                    // }}
                    onChange={handleSelected}
                >
                    <AddIcon />
                    {/* || <RemoveIcon /> */}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="show author details">
                    <Link to={`/authors/${authorKey}`}>
                        <ShareIcon />
                    </Link>
                </IconButton>


                <div>
                    {workInfo?.description &&
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
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
                        {workInfo?.description?.value || workInfo?.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default BookCard