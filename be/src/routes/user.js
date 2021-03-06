const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    const value = req.query.value;
    let users;
    if (value)
        users = await req.context.User.searchText(value);
    else
        users = await req.context.User.find();
    return res.json(users);
});

router.post('/',
    body().isArray().isLength({ min: 1 }).withMessage('must be list'),
    body('*.username').trim().escape().not().isEmpty().withMessage('empty'),
    body('*.email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('*.birthdate').isDate().withMessage('invalid date'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const users = req.body;
        try {
            for (let user of users) {
                const {_id, ...data} = new User(user);
                await User.findOneAndUpdate({ _id: _id }, data, {new: true});
            }
        } catch (err) {
            return res.status(400).json({ error: err.toString() });
        }

        return res.json({'message': 'updated'});
});

module.exports = router;