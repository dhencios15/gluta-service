const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = model('Product', productSchema);

module.exports = Product;
