var filter = require('./filter')
,   Distillery;

Distillery = function (input) {
  if (Array.isArray(input)) {
    this.input = input;
  } else {
    this.input = [input];
  }
  this.fields = [];
  this.embeds = [];

  return this;
};

Distillery.prototype.field = function (key, alias) {
  this.fields.push({ key: key, alias: alias });

  return this;
};

Distillery.prototype.embed = function (key, fields, alias) {
  if ('string' === typeof(fields)) fields = [fields];
  this.embeds.push({ key: key, fields: fields, alias: alias });

  return this;
};

Distillery.prototype.bottle = function () {
  var self   = this
  ,   output = [];

  self.input.forEach(function (input) {
    output.push(filter(input, self.fields, self.embeds));
  });

  if (1 === self.input.length) {
    return output[0];
  } else {
    return output;
  }
};

module.exports = function (input) {
  return new Distillery(input);
};
