const RingCentral = require('ringcentral')
const Posts = require('./posts')
const Groups = require('./groups')
const Persons = require('./persons')
const Companies = require('./companies')

class GlipClient {
  constructor (options) {
    this.rc = new RingCentral(options)
  }

  authorize (options) {
    return this.rc.platform().login(options)
  }

  posts () {
    if (!this._posts) {
      this._posts = new Posts(this.rc)
    }
    return this._posts
  }

  groups () {
    if (!this._groups) {
      this._groups = new Groups(this.rc)
    }
    return this._groups
  }

  persons () {
    if (!this._persons) {
      this._persons = new Persons(this.rc)
    }
    return this._persons
  }

  companies () {
    if (!this._companies) {
      this._companies = new Companies(this.rc)
    }
    return this._companies
  }
}

module.exports = GlipClient
