var _ = require('lodash')
,   Distill;

Distill = function (input) {
  input = input || {};
  this.input = input;
  this.fields = [];
  this.embeds = [];
  this.object = {};
  return this;
};

Distill.prototype.field = function (name, alias) {
  this.fields.push({ key: name, alias: alias });
  return this;
};

Distill.prototype.embed = function (name, fields) {
  if ('string' === typeof(fields)) fields = [fields];
  this.embeds.push({ key: name, fields: fields });
  return this;
};

Distill.prototype.populateFields = function () {
  var self = this;
  self.fields.forEach(function (field) {
    if (self.input[field.key]) {
      self.object[field.key] = self.input[field.key];
    } else if (field.alias && self.input[field.alias]) {
      self.object[field.key] = self.input[field.alias];
    }
  });
};

Distill.prototype.populateEmbeds = function () {
  var self = this;
  self.embeds.forEach(function (embed) {
    if (self.input[embed.key]) {
      self.object[embed.key] = _.map(self.input[embed.key], function (item) {
        var __ = {};
        embed.fields.forEach(function (eField) {
          __[eField] = item[eField];
        });
        return __;
      });
    }
  });
}

Distill.prototype.finalize = function () {
  this.populateFields();
  this.populateEmbeds();
  return this.object;
};

exports.filter = function (input) {
  return new Distill(input);
}
