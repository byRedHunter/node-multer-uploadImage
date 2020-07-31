const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
	res.render('uploadImage')
})
router.post('/upload', (req, res) => {
	console.log(req.file)
	res.redirect(`uploads/${req.file.filename}`)
})

module.exports = router
