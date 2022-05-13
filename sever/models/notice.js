const mongoose = require("mongoose");

/* Schema: 表的描述 新闻 */
const Schema = mongoose.Schema;
const NoticeSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

/* model 建模型 */
module.exports = mongoose.model("Notice", NoticeSchema);
