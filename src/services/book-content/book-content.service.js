import shareDb from '../sharedb/sharedb.service'

class BookContent {
  constructor (id) {
    this.doc = shareDb.get('bookContent', id)
  }

  submitOp (op) {
    return new Promise((resolve, reject) => {
      this.doc.submitOp(op, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}

export default new BookContent('my-book')
