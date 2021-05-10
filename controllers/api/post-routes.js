const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
// const { update } = require('../../models/User'); // not in snapshot code

// get all users
router.get('/', (req, res) => {
    console.log('=======================');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
        // Query configuration
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Post.create({
            title: req.body.title,
            post_url: req.body.post_url,
            // user_id: req.body.user_id  // delta from snapshot code below
            user_id: req.session.user_id  // from snapshot code
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
    // make sure the session exists first
    if (req.session) {
        //pass session id along with all destructed properties on req.body
        Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});
    // custom static method created in models/Post.js
//     Post.upvote(req.body, { Vote })
//         .then(updatedPostData => res.json(updatedPostData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });
//     // Vote.create({
    //     user_id: req.body.user_id,
    //     post_id: req.body.post_id
    // })
    // .then(() => {
    //     // then find the post we just voted on
    //     return Post.findOne({
    //         where: {
    //             id: req.body.post_id
    //         },
    //         attributes: [
    //             'id', 
    //             'post_url', 
    //             'title,', 
    //             'created_at',
    //             // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name 'vote_count'
    //             [
    //             sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
    //             'vote_count'
    //             ]
    //         ]
    //     })
    //     .then(dbPostData => res.json(dbPostData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });
    // });
    // // .then(dbPostData => res.json(dbPostData))
    // // .catch(err => {
    // //     console.log(err);
    // //     res.status(400).json(err);
    // // });


router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;