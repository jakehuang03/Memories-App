const express = require('express');
const {getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost} = require('../controllers/posts');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.post('/:id/commentPost', auth, commentPost);
router.delete('/:id', auth, deletePost);

router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);

module.exports = router; 