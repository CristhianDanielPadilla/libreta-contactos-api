const router = require('express').Router();

const { Contact} = require('../../database/db');
const contactcontroller = require('../controllers/ContactController');
const authController = require('../../controllers/authController');

router.get('/', async (req, res) => {
    try{
        const Contact = await contactcontroller.getContacts();
        res.json({success: true, contacts: contacts});
    } catch (error){
        res,json({success: false, status: 200, mess: 'Error getting contacts', err: error})
    }
})

router.get('/:id', async (res, res) =>{
    try{
        const contact = await contactcontroller.getContact(req.params.id);

        res.json({success: true, contact: contact});
    } catch (error){
        res.json({success: false, mess: 'Error getting contact', err: error});
    }

})
router.get('/user/:id', async (req, res) => {
    try{
        const contact = await contactcontroller.getContactByUser(req.params.id);

        res.json({success: true, contact: contact});
    } catch (error) {
        res.json({success: false, mess: ' Error getting contact', err: error});
    }

})

router.post('/', async (req, res) => {
    try{
        const contact = await contactcontroller.createContact(req.body);

        res.json({success: true, mess: 'Contact Created', contact: contact});
    } catch (error) {
        res.json({success: false, mess: ' Error creating contact', err: error});
    }

})

router.put('/:id', async (req, res) => {
    try{
        const contact = await contactcontroller.editContact(req.body, req.params.id);

        if(contact == 0){
            return res.json({success: false, mess: 'Contact not found'});
        }

        res.json({success: true, mess: 'Contact Edited Successfully', contact: contact});
    } catch (error) {
        res.json({success: false, mess: ' Error creating contact', err: error});
    }

})

router.delete('/:id', async (req, res) => {
    try{
        const contact = await contactcontroller.deleteContact(req.params.id);

        if(contact == 0){
            return res.json({success: false, mess: 'Contact not found'});
        }
        res.json({success: true, mess: 'Contact Deleted Successfully', contact: contact});
    } catch (error) {
        res.json({success: false, mess: ' Error deleting contact', err: error});
    }
})

module.exports = router;

