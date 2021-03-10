const { Schema } = require('mongoose')
const { MongoClient } = require('../repositories/mongodb/dbClient')

const linkSchema = new Schema({
  originalUrl: { type: String, required: true },
  hash: { type: String, required: true }
}, {
  timestamps: true,
  id: true,
  toObject: { virtuals: true, versionKey: false },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id
    }
  }
})

linkSchema.index({ hash: 1 })

module.exports = MongoClient.model('links', linkSchema)
