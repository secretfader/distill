var distill = require('../lib')
,   expect  = require('chai').expect
,   inspect = require('util').inspect
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

    'should strip out unspecified fields': function () {
      var data =
        distill(this.input)
          .field('id')
          .field('title')
          .field('description')
          .bottle();

      expect(data).to.have.property('id');
      expect(data).to.have.property('title');
      expect(data).to.have.property('description');
      expect(data).to.not.have.property('author_address');
    },

    'should allow referencing a field by alias': function () {
      var data =
        distill(this.input)
          .field('user', '_user')
          .field('author_address')
          .bottle();

      expect(data).to.have.property('user');
      expect(data).to.have.property('author_address');
      expect(data).to.not.have.property('id');
    },

    'should embed ids for array fields': function () {
      this.input = _.extend(this.input, {
        shows: [
          { id: 1, name: 'Inside the Machine', desc: 'Yo' },
          { id: 2, name: 'Inside the Machine', desc: 'Hi' },
          { id: 3, name: 'Inside the Machine', desc: 'Distill is simple!' }
        ],
        funk_rating: [
          { id: 4, name: 'Kinda Funky' },
          { id: 5, name: 'Whoa, Funky' },
          { id: 6, name: 'He laid down the boogie until he died.' }
        ]
      });

      var data =
        distill(this.input)
          .field('title')
          .embed('shows', ['id', 'desc'])
          .embed('funk', 'name', 'funk_rating')
          .bottle();

      expect(data).to.have.property('title');
      expect(data).to.have.property('shows');
      expect(data).to.have.property('funk');
      expect(data.shows).to.have.length(3);
      expect(data.funk).to.have.length(3);
      expect(data.shows[0]).to.have.property('id');
      expect(data.shows[0]).to.have.property('desc');
      expect(data.shows[0]).to.not.have.property('name');
      expect(data.funk[0]).to.have.property('name');
      expect(data.funk[0]).to.not.have.property('id');
    }
  },

  'Serializing an array of JSON objects': {
    before: function () {
      this.input = [
        {
          id: 1,
          title: 'Hello.',
          description: 'Yes, Distill handles arrays too.',
          tags: [
            {
              id: 4,
              name: '#distill',
              aux: 'Yo.'
            }
          ]
        },
        {
          id: 2,
          title: 'Did you not believe me?',
          description: 'Well, you should.',
          tags: [
            {
              id: 5,
              name: '#rocks',
              aux: 'Yo.'
            }
          ]
        },
        {
          id: 3,
          title: 'Okay, I see your skepticism.',
          description: 'This is simple, right?',
          tags: [
            {
              id: 6,
              name: '#cosign',
              aux: 'Yo.'
            }
          ]
        }
      ]
    },

    'should return the specified keys for each object': function () {
      var data =
        distill(this.input)
          .field('id')
          .field('title')
          .embed('tags', ['id', 'name'])
          .bottle();

      expect(data.length).to.equal(3);
      expect(data[0]).to.have.property('id');
      expect(data[0]).to.have.property('title');
      expect(data[0]).to.not.have.property('description');
      expect(data[0]).to.have.property('tags');
      expect(data[0].tags[0]).to.have.property('id');
      expect(data[0].tags[0]).to.not.have.property('aux');
    }
  }
}
