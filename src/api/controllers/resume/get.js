const path = require("path");

module.exports = {
  getResume: (req, res) => {
    try {
      const resumeFile = path.join("resources", "masti_anas_cv.pdf");
      // Download the resume
      return res.download(resumeFile);
    } catch {
      res.statut(422).send("An error occurred, please try again later.");
    }
  },
};
