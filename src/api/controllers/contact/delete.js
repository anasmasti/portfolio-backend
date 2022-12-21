module.exports = {

    //Delete message
    deleteContact: async (req, res) => {
        await Contact.findByIdAndRemove(req.params.Id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.Id
                    });
                }
                res.send({ message: "Note deleted successfully!" });
            })
    }
}