const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/contacts', require('./contacts'));
// router.use(
//   '/',
//   (docData = (req, res) => {
//     let docData = {
//       documentationURL: 'https://cse341-node-br28.onrender.com-api-docs',
//     };
//     res.send(docData);
//   })
// );

module.exports = router;