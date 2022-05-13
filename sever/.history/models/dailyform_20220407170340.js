const mongoose = require('mongoose')

/* Schema: 表的描述 各省市疫情*/
const Schema = mongoose.Schema
const DailyFormSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    temperature: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    submit: {
        type: Boolean,
        require: true
    },

})

/* model 建模型 */
module.exports = mongoose.model('DailyForm', DailyFormSchema)