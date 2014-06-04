var _ = require('lodash');

module.exports = function (input, fields, embeds) {
  var output = {}
  ,   _embeds;

  fields.forEach(function (field) {
    if (field.key in input) {
      output[field.key] = input[field.key];
    } else if (field.alias && field.alias in input) {
      output[field.key] = input[field.alias];
    }
  });

  _embeds = embeds.forEach(function (embed) {
    var field;
    if (embed.alias) {
      field = embed.alias;
    } else { field = embed.key }
    if (embed.key in input || embed.alias in input) {
      output[embed.key] = _.map(input[field], function (item) {
        var __ = {};
        embed.fields.forEach(function (eField) {
          __[eField] = item[eField];
        });
        return __;
      });
    }
  });

  return _.extend(output, _embeds);
};
