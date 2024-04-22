const { fetchAllUsers, addUser, fetchUserByEmail, updateUser, updateBookingForUser } = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res, next) => {

    fetchAllUsers().then((data) => {
        res.status(200).send(data)
    }).catch(next);
}

exports.postUser = (req, res, next) => {

    const { username, email, password } = req.body;
    
    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }


    const user = {
        username: req.body.username,
        firstName: "",
        lastName: "",
        email: req.body.email,
        password: req.body.password,
        eventData: [],
        isStaff: false,
    }
    addUser(user).then((newUser) => {
        const userData = {
            user: {
                id: newUser._id 
            }
        };  
        const token = jwt.sign(userData, 'secret_event');
        res.status(201).json({ success: true, token, addedUser: newUser });
    })
    .catch(next);
    
}

exports.getUserByEmail = (req, res, next) => {
    
    const email  = req.params.email;

    if (!email) {
        return res.status(400).send({status: 400, msg : 'Email invalid'});
    } else {
        fetchUserByEmail(email).then((data) => {
            if (data.length > 0) {
                res.status(200).send(data) 
            } else res.status(404).send({status: 404, msg : 'Email not found'})            
    }).catch(next)
    }
}

exports.loginUser = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    fetchUserByEmail(email).then((user) => {
        if (user) {
            const passCompare = password === user[0].password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user[0]._id
                    }
                }
                const token = jwt.sign(data, 'secret_event', { expiresIn: '1h' });
                res.status(200).json({success:true, token, user: user[0]});
            }
            else {
                res.status(400).json({success:false, errors: "Wrong password"})
            }
        }
        else {
            res.status(400).json({success:false, errors: "Wrong email address"})
        }
        })       
        .catch(next)
    }

    exports.patchUser = (req, res, next) => {
        
        const email = req.params;
        const propertyToUpdate = req.body;

        fetchUserByEmail(email.email).then((user) => {
            if (!user[0] || user[0] == []) {  
                return res.status(404).send({ message: "User Not Found" });
            }
            updateUser(email, propertyToUpdate).then((updatedUser) => {
                res.status(200).send(updatedUser);
            });
        })
        .catch(next);
    }

    exports.addBookedEventToUser = (req, res, next) => {
 
        const   eventID = req.body;
        const { email }  = req.params;
        updateBookingForUser(email, eventID).then((userUpdated) => {
            if (userUpdated) res.status(200).send(userUpdated)
        })
        .catch(next);
    }
