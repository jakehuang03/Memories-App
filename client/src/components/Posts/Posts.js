import React from 'react';
import Post from './Post/Post';
import useEffect from './styles';
import { useSelector } from 'react-redux';

const Posts = () => {
    const posts = useSelector((state) => state.posts)
    console.log(posts)
    const classes = useEffect();
    return (
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    )
}

export default Posts;