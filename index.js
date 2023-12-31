require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index.route')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded())
app.use(router);

app.listen(PORT, () => {
	console.log(`App listening on port http://localhost:${PORT}`)
})

const loginCredentials = [
	{
		"email": "arzhed@admin.com",
		"password": "admin17"
	},
	{
		"email": "see on db",
    	"password": "akusayangkamu"
	}
]
