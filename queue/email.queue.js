const Queue = require('bull')

const emailQueue = new Queue('email', {
    redis: {
        host: 'localhost',
        port: 6379,
        db: 0
    }
})

const sendEmail = async (text) => {
    await emailQueue.add({text: text}, {delay: 6000})
}

emailQueue.process(async (job) => {
    console.log('Email has been added in a queue: ' + job.data.text)
    return 'Completed Result'
})

emailQueue.on('completed', (job, result) => {
    console.log('Queue has finished working: ' + result)
})

module.exports = sendEmail