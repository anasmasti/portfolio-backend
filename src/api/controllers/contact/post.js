const {
  contactValidationSchema,
} = require("../../validations/contact.validation");
const Contact = require("../../models/contact.model.js");

module.exports = {
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
      res.status(403).send({
        message: error.message || "Error retrieving.",
      });
    }
  },
};
