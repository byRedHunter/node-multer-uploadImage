const express = require('express')
// por defecto express usa ejs
// const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const { v4 } = require('uuid')

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/uploads'),
	filename: (req, file, cb) => {
		cb(null, v4() + path.extname(file.originalname).toLocaleLowerCase())
	},
})

// initializations
const app = express()

// settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middlewars -> codigo que se ejecuta antes de llegar a las rutas
app.use(
	multer({
		storage,
		dest: path.join(__dirname, 'public/uploads'),
		// dar un peso limite a las imagenes
		limits: { fileSize: 1000000 },
		fileFilter: (req, file, cb) => {
			const fileTypes = /jpeg|jpg|png|gif/
			const mimetype = fileTypes.test(file.mimetype)
			const extname = fileTypes.test(path.extname(file.originalname))

			if (mimetype && extname) {
				return cb(null, true)
			}

			cb('Error: Archivo debe ser una imagen valida')
		},
	}).single('image')
)

// routes
app.use(require('./routes/images'))

// static files
app.use(express.static(path.join(__dirname, 'public')))

// starting the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`)
})
