
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request') 
const https = require('https')

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req,res) {
    const firstName = req.body.firstName
    const secondName = req.body.secondName
    const mail = req.body.mail

    const data = {
        members: [
            {
                email_address: mail,
                status: 'subscribed', 
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = 'https://us20.api.mailchimp.com/3.0/lists/af2938afaa'

    const options = {
        method: 'POST',
        auth: 'albert:e8d358750ce8f5b9be10af425d0998eb-us20'
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

    app.post('/failure', function(req,res){
        res.redirect('/');
    })

app.listen(process.env.PORT || 3000, function(){
    console.log('start listen');
})


// API key
// e8d358750ce8f5b9be10af425d0998eb-us20

// list id
// af2938afaa

