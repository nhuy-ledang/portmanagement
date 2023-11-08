const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const layoutSchema = new Schema({
	id:{
  	type: Number,
  	unique: true
  },
	layoutname:{
    type: String,
    require: true
  },
	layoutdir:{
		type: String,
		require: true
	},
  portlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Port' // Tham chiếu đến mô hình 'Port'
  }],
	created: {
    type: String,
    default: Date.now
  },
})

layoutSchema.pre('save', async function (next) {
  if (this.isNew) {
    const maxIdLayout = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });
    this.id = (maxIdLayout && maxIdLayout.id + 1) || 1;
  }
  next();
});

const LayoutMongoose = mongoose.model("Layout", layoutSchema);

module.exports = LayoutMongoose;
