const Contact = require('../models/contact.model.js');
var express = require('express');
var router = express.Router()
const { contactValidationSchema } = require('../validations/contact.validation')

// send message
router.post('/', async (req, res, next) => {
    try {
        const validatedRequest = await contactValidationSchema.validateAsync(req.body)
        const message = new Contact(validatedRequest);
        await message.save()
            .then(data => {
                res.send(data);
            }).catch(error => {
                if (error.isJoi === true) error.status = 422
                next(error)
            });
    } catch (error) { 
        next(error)
    }
});

//Find all messages and sort them by order descending 
router.get('/', async (req, res) => {
    await Contact.find().sort({ 'updatedAt': 'desc' })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error retrieving."
            });
        });
});

//Find message by id
router.get('/:Id', async (req, res) => {
    await Contact.findById(req.params.Id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Message not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
});

//Get count of messages
router.get('/count', async (req, res) => {
    const count = await Contact.find().countDocuments();
    return res.send(JSON.stringify(count));
});

//Update message
router.put('/:Id', async (req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "content can't be empty"
        });
    }
    await Contact.findByIdAndUpdate(req.params.Id, {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.Id
                });
            }
            res.send(data);
        })
})

//Delete message
router.delete('/:Id', async (req, res) => {
    await Contact.findByIdAndRemove(req.params.Id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.Id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
});


module.exports = router;