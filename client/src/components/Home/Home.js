import React, {useState } from "react";
import { Grid, Container, Grow, Paper, AppBar, TextField, Button, Chip} from "@material-ui/core";
import {useHistory, useLocation} from 'react-router-dom';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import useStyles from './styles';
import Pagination from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();   
    
    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`);
      } else {
        history.push('/');
      }
    }
    const handleKeyPress = (event) => {
      if(event.keyCode === 13) {
          searchPost();
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete))
    return (
    <Grow in>
        <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyPress}
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                />
                {/* <TextField 
                  name="search tags"
                  variant="outlined"
                  label="Search Tags"
                  fullWidth
                /> */}
                <Chip 
                  style={{margin: '10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    )
}

export default Home;