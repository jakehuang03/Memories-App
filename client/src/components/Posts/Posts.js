import React from 'react';
import Post from './Post/Post';
import useEffect from './styles';

const Posts = () => {
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