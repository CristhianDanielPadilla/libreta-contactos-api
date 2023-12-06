const jwt = require('jsonewbtoken');
const bcryptjs = require('bcryptjs');
const { promisify } = require('util');

const { User } = require('../database/db');

exports.require = async (body) => {
    try {
        const username = body.username;
        const password = body.password;
        let passHash = await bcryptjs.hash(password, 8);

        const newUser = {
            username: username,
            password: passHash
        }

        const user = await User.create(newUser);

        const id = user.id;
        const token = jwt.sign({id: id, username: username}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
        })

        //res.cookie('jwt', token);
        return token;
    }catch (error){
        return error;
    }
}

    exports.getUser = async (username) => {
        const user = await User.findOne({where : {username: username}});
        return user;
    }

    exports.login = async (body, res) => {
        try{
            const username = body.username;
            const password = body.password;

            if(!username || !password){
                return false;
            }

            const user = await this.getUser(username);
            if(!user || !(await bcryptjs.compare(password, user.password))){
                return false;
            }else{
                const id = user.id;
                const token = jwt.sign({id:id, username: username}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA,    
                })

                //res.cookie('jwt',token)
                return token;
            }
        }catch(error){
            return error;
        }    
    }

exports.isAuthenticated = async (req, res, next) => {
    if(req.cookies.jwt) {
        try{
            const decodificada = await promisify(jwt.verify)(rep.cookies.jwt, process.env.JWT_SECRET)
            const user = await User.findByPk({ where : {id: decodificada.id}});

            if(!user){
                return next;
            }

            req.user = user;
            return next();
        }catch (error){
            return next();
        }
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return 'Logout';
}