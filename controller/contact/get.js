module.exports = {

    //Find all messages and sort them by order descending 
    getContact: async (req, res) => {
        await Contact.find().sort({ 'updatedAt': 'desc' })
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "error retrieving."
                });
            });
    },


    //Find message by id
    getContactById: async (req, res) => {
        await Contact.findById(req.params.Id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: "Message not found with id " + req.params.Id
                    });
                }
                res.send(data);
            })
    },

    //Get count of messages
    getContactCount: async (req, res) => {
        const count = await Contact.find().countDocuments();
        return res.send(JSON.stringify(count));
    }

}