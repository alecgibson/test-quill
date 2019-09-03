import shareDb from '../sharedb/sharedb.service'

export default class RichText {
  constructor (id) {
    this.doc = shareDb.get('richText', id)
  }

  subscribe() {
    return new Promise((resolve, reject) => {
      this.doc.subscribe((error) => {
        if (error) {
          return reject(error)
        }

        if (!this.doc.type) {
          return this._create().then(resolve)
        }

        resolve()
      });
    });
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

  _create() {
    return new Promise((resolve, reject) => {
      this.doc.create([{ insert: '\n' }], 'rich-text', (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      });
    });
  }
}
