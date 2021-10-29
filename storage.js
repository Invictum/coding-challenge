const SortedArray = require("sorted-array");

function sum(a, b) {
    return a + b
}

function upsert(obj, key, value) {
    obj[key] = key in obj ? obj[key] + value : value
}

/**
 * Simple in-memory transaction storage
 */
class InMemoryStorage {

    constructor() {
        const sortByDate = (one, two) => new Date(one['timestamp']) - new Date(two['timestamp'])
        this.transactions = new SortedArray([], sortByDate)
    }

    /**
     * Calculates available points balances for each payer
     * @return Object in which each key - value pair represents payer name and amount of points. Returns empty object
     * if transaction list is empty
     */
    balance() {
        const balance = {}
        this.transactions.array.forEach(item => {
            upsert(balance, item['payer'], item['points'])
        })
        return balance
    }

    /**
     * Processes transaction record, logic depends on points amount. For positive values transaction object simple saved
     * into the storage. For negative values oldest records are used to redeem the amount of negative transaction. If no
     * enough transactions are present to redeem nothing happens. Negative value transaction isn't saved in a storage.
     *
     * @param transaction object with 'payer', 'points' and 'timestamp' mandatory fields
     */
    add(transaction) {
        if (transaction['points'] > 0) {
            this.transactions.insert(transaction)
        } else {
            // Negative points flow
            const candidates = this.transactions.array.filter(record => record['payer'] === transaction['payer'])
            let points = transaction['points']
            while (points < 0 && candidates.length > 0) {
                const item = candidates.shift()
                points = points + item['points']
                if (points > 0) {
                    item['points'] = points
                } else {
                    this.transactions.remove(item)
                }
            }
        }
    }

    /**
     * Tries to spend specified points amount
     *
     * @param {number} pointsToSpend
     * @return Object in which each key - value pair represents payer name and amount of redeemed points. Returns
     * undefined if not enough points available
     */
    spend(pointsToSpend) {
        // Check available points
        const total = this.transactions.array.map(item => item['points']).reduce(sum, 0)
        if (total < pointsToSpend) {
            return undefined
        }
        // Spend points
        const claimed = {}
        while (pointsToSpend > 0) {
            const record = this.transactions.array.shift()
            const payer = record['payer']
            if (record['points'] > pointsToSpend) {
                record['points'] = record['points'] - pointsToSpend
                this.transactions.array.unshift(record)
                upsert(claimed, payer, -pointsToSpend)
                break
            } else {
                pointsToSpend = pointsToSpend - record['points']
                upsert(claimed, payer, -record['points'])
            }
        }
        return claimed
    }
}

module.exports = new InMemoryStorage()
