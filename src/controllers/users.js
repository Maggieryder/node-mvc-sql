const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.fetchAll(users => {
        res.render('users', {
            users: users,
            pageTitle: 'Users',
            path:'/users'
        });
    })  
};

exports.addUser = (req, res, next) => {
    const user = new User(req.body.fname);
    user.save();
    res.redirect('/users');
};

exports.getAddUserPage = (req, res, next) => { 
    res.render('index',{
        pageTitle: 'Add User',
        path:'/add-user'
    });
};
