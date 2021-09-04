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
// import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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



const AuthorCard = () => {

  let { authorKey } = useParams()
  let { mergedAuthorInfo, getMergedAuthorInfoController } = useContext(BookContext)

  useEffect(() => {
    getMergedAuthorInfoController(authorKey)
  }, [authorKey])

  console.log('mergedAuthorInfo:', mergedAuthorInfo)

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="author" className={classes.avatar}>
        //     A
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={mergedAuthorInfo?.name}
        subheader={(`${mergedAuthorInfo?.birth_date} - ${mergedAuthorInfo?.death_date}`) || "We didn't bother looking up the author's birth date."}

      />
      {mergedAuthorInfo?.photos &&
        <CardMedia className={classes.media} title="portrait author">
          <img src={`https://covers.openlibrary.org/a/id/${mergedAuthorInfo?.photos[0]}-M.jpg`} alt="Looking at the author's face is not recommended." />
        </CardMedia>
      }
      <CardContent>
        <Paper>
          <p>{`This author has written ${mergedAuthorInfo?.work_count || "an unknown number of"} book(s) so far.`}</p>
          <p><i>{mergedAuthorInfo?.top_work}</i>{" is considered to be the author's finest work." || "We have no clue what the author's finest work might be."}</p>
          <IconButton aria-label="show all books">
            <Link to={`/authors/${authorKey}/books/all`}>
              <ShareIcon />
              see all books
            </Link>
          </IconButton>
        </Paper>
      </CardContent>

      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}

        <div>
          {mergedAuthorInfo?.bio &&
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
            {mergedAuthorInfo?.bio?.value || mergedAuthorInfo?.bio}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default AuthorCard


