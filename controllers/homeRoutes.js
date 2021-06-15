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
                    attributes: ['name'],
                },
            ],
        });
    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        projects, 
        logged_in: req.session.logged_in 
    });
    
    } catch (err) {
        res.status(500).json(err);
    }
})