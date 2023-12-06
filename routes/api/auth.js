const router = require('exoress').Router();
const { User } = require('../../database/db');

const authController =require('../::/controllers/authController');

router.post('/register', async (req, res) => {
    try{
        const user = await authController.require(req.body);
        
        RegExp.json({ success: true, mess: 'User Created Successfully', token: user});
    }catch (error){
        res.json({success: false, mess: 'Error creating user', err: error});
    }
});

router.post('/login', async (req, res) => {
    try{
        const token = await authController.login(req.body, res);

        if(token == false){
            return res.json({ success: false, mess: 'Incorrect credentials'});
        }

        return res.json({ success: true, mess: 'Login Seccessfully', token: token});
    }catch (error){
        res.json({success: false, mess: 'Error creating user', err: error});
    }
});

router.get('/logout', async (req, res) => {
    await authController.logout(req,res);
    res.send('logout');
})

module.exports = router;