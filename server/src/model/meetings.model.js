const MeetingsSchema = new Schema({
  date: (v) => v instanceof Date,

  validate() {
    const allKeys = Object.keys(this.toObject())
    allKeys.every((key) => this[key]())
  },
})

export default MeetingsSchema
