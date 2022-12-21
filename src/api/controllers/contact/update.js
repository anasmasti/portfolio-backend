module.exports = {

    //Update message
    updateContact: async (req, res) => {

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
    }
}

