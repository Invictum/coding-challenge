const express = require('express')
const storage = require('./storage')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()

// Swagger setup
app.use('/api-docs', (req, res, next) => {
    swaggerDocument.host = req.get('host')
    req.swaggerDoc = swaggerDocument
    next()
}, swaggerUi.serve, swaggerUi.setup())

const port = 3000
app.listen(port, '0.0.0.0', () => console.log(`Listening at http://localhost:${port}`))

app.use(express.json())

app.post('/transactions', (req, res) => {
    // Validate transaction object
    if (!checkPropertiesPresence(req.body, ['payer', 'points', 'timestamp'])) {
        res.statusCode = 401
        res.json(message('Mandatory parameters: \'payer\', \'points\', \'timestamp\''))
        return res.end()
    }
    // Proceed with transaction
    storage.add(req.body)
    res.json(message('info', 'Transaction has been processed'))
})

app.get('/points/balance', (req, res) => {
    res.json(storage.balance())
})

app.post('/points/spend', (req, res) => {
    // Validate spend request
    if (!checkPropertiesPresence(req.body, ['points'])) {
        res.statusCode = 401
        res.json(message('Mandatory parameters: \'points\''))
        return res.end()
    }
    // Proceed with spending
    const spent = storage.spend(req.body['points'])
    if (spent) {
        res.json(spent)
    } else {
        res.statusCode = 401
        res.json(message('Insufficient points to spend'))
    }
})

function checkPropertiesPresence(obj, properties) {
    for (let i = 0; i < properties.length; i++) {
        if (!obj.hasOwnProperty(properties[i])) {
            return false
        }
    }
    return true
}

function message(type = 'error', message) {
    return {
        type: type,
        message: message
    }
}
