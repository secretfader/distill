var distill = require('../')
,   expect  = require('chai').expect
,   _       = require('lodash');

module.exports = {
  'Serializing a simple JSON string': {
    before: function () {
      this.input = {
        id: 1,
        _user: '1111',
        title: 'Hello, World',
        description: 'A article that says Hello.',
        author_address: '127 W North Ave, Chicago, IL'
      }
    },

    'it should strip out unspecified fields': function () {
      var data =
        distill.filter(this.input)
          .field('id')
          .field('title')
          .field('description')
          .finalize();

      expect(data).to.have.property('id');
      expect(data).to.have.property('title');
      expect(data).to.have.property('description');
      expect(data).to.not.have.property('author_address');
    },

    'it should allow referencing a field by alias': function () {
      var data =
        distill.filter(this.input)
          .field('user', '_user')
          .field('author_address')
          .finalize();

      expect(data).to.have.property('user');
      expect(data).to.have.property('author_address');
      expect(data).to.not.have.property('id');
    },

    'it should embed ids for array fields': function () {
      this.input = _.extend(this.input, {
        shows: [
          { id: 1, name: 'Inside the Machine' },
          { id: 2, name: 'Inside the Machine' },
          { id: 3, name: 'Inside the Machine' }
        ]
      });

      var data =
        distill.filter(this.input)
          .field('title')
          .embed('shows', 'id')
          .finalize();

      expect(data).to.have.property('title');
      expect(data).to.have.property('shows');
      expect(data.shows).to.have.length(3);
      expect(data.shows[0]).to.have.property('id');
      expect(data.shows[0]).to.not.have.property('title');
    }
  }
}
