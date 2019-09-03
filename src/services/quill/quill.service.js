class QuillStore {
  constructor() {
    this.quillsById = {}
  }

  register(id, quill) {
    this.quillsById[id] = quill
  }

  unregister(id) {
    delete this.quillsById[id]
  }

  submitOp(id, ops) {
    const quill = this.quillsById[id]
    if (!quill) {
      throw new Error('No Quill')
    }

    quill.updateContents(ops)
  }
}

export default new QuillStore();
