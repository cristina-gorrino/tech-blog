const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

// index route shows all existing posts on the blog
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a specific Post by id
// TODO add withAuth, not sure if model:Comment is needed here
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment
            }
            ],
        });

        const post = postData.get({ plain: true });
        console.log(post);

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render the logged in user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const post = postData.get({ plain: true });
        res.render('dashboard', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Route for users who need the sign-up form
router.get('/signup', (req, res) => {

    res.render('signup');
});

module.exports = router;