const {
  contactValidationSchema,
} = require("../../validations/contact.validation");
const Contact = require("../../models/contact.model.js");

module.exports = {
  // send message
  postContact: async (req, res) => {
    try {
      const validatedRequest = await contactValidationSchema.validateAsync(
        req.body
      );
      const message = new Contact(validatedRequest);
      await message.save().then((data) => {
        res.send(data);
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "error retrieving.",
      });
    }
  },
};
