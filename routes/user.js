const express = require('express'),
    router = express.Router()

const { Connection } = require('../ext/connections'),
conf = require('../config')

const collection = 'users'

Connection.connectToMongo()

router.route('/').get((req, res) =>{
	let content =[]

	res.render('pages/users' , {
		title:"Users",
		siteName:conf.siteName,
		content
	})

})

router.route('/:id').get((req, res) => {

	const id = req.params.id
	
	let content ={
		firstname:'' ,
		lastname:'' ,
		email: '',
		password:'' ,
		_id:id 
	}

	res.render('pages/user' , {
		title:"User",
		siteName:conf.siteName,
		content
	})

}).post((req, res) => {
	console.log();
	Connection.db.collection(collection).insertOne(req.body, (err , result) =>{
		if(err) {
			throw err
		}
		res.redirect('/user')
	})
	res.send('create user...')
}).put((req, res) => {
	res.send('update user...')
}).delete((req, res) => {
	res.send('delete user...')
})

module.exports = router