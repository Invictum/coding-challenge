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

// Port configuration
const port = process.argv.slice(2)[0] || 3000
app.listen(port, '0.0.0.0', () => console.log(`Listening at http://localhost:${port}`))

// Adding json support
app.use(express.json())

// Routes definition
app.post('/transactions', (req, res) => {
    // Validate transaction object
    const requiredNames = ['payer', 'points', 'timestamp']
    if (!checkPropertiesPresence(req.body, requiredNames)) {
        res.statusCode = 400
        res.json(message(`Mandatory parameters: ${requiredNames.join(', ')}`))
        return res.end()
    }
    // Proceed with transaction
    storage.add(req.body)
    res.json(message('Transaction has been processed', 'info'))
})

app.get('/points', (req, res) => {
    res.json(storage.balance())
})

app.post('/points/spend', (req, res) => {
    // Validate spend request
    const requiredNames = ['points']
    if (!checkPropertiesPresence(req.body, requiredNames)) {
        res.statusCode = 400
        res.json(message(`Mandatory parameters: ${requiredNames.join(', ')}`))
        return res.end()
    }
    // Proceed with spending
    const spent = storage.spend(req.body['points'])
    if (spent) {
        res.json(spent)
    } else {
        res.statusCode = 400
        res.json(message('Insufficient points to spend'))
    }
})

/**
 * Simple validation function. Checks specified object contains all the passed properties names. Doesn't actual
 * properties values.
 */
function checkPropertiesPresence(obj, properties) {
    for (let i = 0; i < properties.length; i++) {
        if (!obj.hasOwnProperty(properties[i])) {
            return false
        }
    }
    return true
}

/**
 * Util function builds response for specified message and optional type
 */
function message(message, type = 'error') {
    return {
        type: type,
        message: message
    }
}
