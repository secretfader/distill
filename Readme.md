# Distill

Remove impurities from your JSON objects with ease.

## Usage

Distill is a simple library that helps you clean up dirty JSON objects. For instance, if you're providing an API. Some fields might be private (and shouldn't be exposed via the public API), while others could be arrays of data, and you only need to expose one of their attributes.

```javascript
var distill = require('distill');
var data    = {
  id: 1,
  title: 'Hello, World',
  dirty_field: 'This field should not be exposed.',
  authors: {
    id: 2,
    name: 'Joshua',
    email: 'joshua@example.org'
  }
};

var output = distill.filter(data)
  .field('id')
  .field('title')
  .embed('authors', 'id');
```

With a simple, pleasurable DSL, Distill turns this previously frustrating task into a few lines of readable code.

## License

Copyright (C) Nicholas Young, Original Machine LLC.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
