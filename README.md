# node-translation

Multi-lingual translation library.

## Usage

### General

```javascript
const translations = {
  "Hello {person}, did you finish the {project} project?": {
    "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
    "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
  }
};

const french = Translation.create({
  language: "fr-CA",
  translations
});

const spanish = Translation.create({
  language: "es",
  translations
});

const german = Translation.create({
  language: "de",
  translations
});

const user = {
  name: "Amin",
  project: "Translation"
};

console.log(french`Hello ${user.name}, did you finish the ${user.project} project?`);
console.log(spanish`Hello ${user.name}, did you finish the ${user.project} project?`);
console.log(german`Hello ${user.name}, did you finish the ${user.project} project?`);
console.log(french`I think it is actually... Any thoughts?`);
console.log(spanish`Anyone there...?`);
console.log(german`Well, no news is good news I guess...`);

// Salut Amin, est-ce que tu as fini le projet Translation ?
// Hola Amin, ¿has terminado el proyecto Translation?
// Hello Amin, did you finish the Translation project?
// I think it is actually... Any thoughts?
// Anyone there...?
// Well, no news is good news I guess...
```

### Browser

#### ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <script type="module">
    import {Translation} from "https://unpkg.com/@aminnairi/translation?module";
  </script>
</html>
```

[Try it online!](https://replit.com/join/wmbfaqir-amin_nairi).

#### Classic

```html
<!DOCTYPE html>
<html>
  <script src="https://unpkg.com/@aminnairi/translation"></script>
  <script type="module">
    "use strict";

    const {Translation} = window["@aminnairi/translation"];
  </script>
</html>
```

[Try it online!](https://replit.com/join/hfxogpes-amin_nairi)

### Node.js

```console
$ npm install @aminnairi/translation
```

#### ECMAScript Module

```javascript
import {Translation} from "@aminnairi/translation";
```

#### CommonJS

```javascript
const {Translation} = require("@aminnairi/translation");
```

## Requirements

- Node
