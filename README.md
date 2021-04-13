# node-translation

Multi-lingual translation library.

[![Tests](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml)

## Usage

### General

```javascript
"use strict";

const translate = Translation.create({
  language: navigator.language,
  translations: {
    "Hello {person}, have you finished the {project} project?": {
      "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
      "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
    }
  }
});

const person = "John DOE";
const project = "TOPSECRET";
const translation = translate`Hello ${person}, have you finished the ${project} project?`;
```

### Browser

#### ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <script type="module">
    import {Translation} from "https://unpkg.com/@aminnairi/translation/module";
  </script>
</html>
```

#### Classic

```html
<!DOCTYPE html>
<html>
  <script src="https://unpkg.com/@aminnairi/translation/browser"></script>
  <script type="module">
    "use strict";

    const {Translation} = window["@aminnairi/translation"];
  </script>
</html>
```

### Node.js

```console
$ npm install @aminnairi/translation
```

#### ECMAScript Module

```javascript
import {Translation} from "@aminnairi/translation";
```

### Deno

```javascript
import {Translation} from "https://unpkg.com/@aminnairi/translation/module";
```

#### CommonJS

```javascript
const {Translation} = require("@aminnairi/translation");
```

### Frameworks

#### Alpine.js

```html
<!DOCTYPE html>
<html>
  <body>
    <div x-data="data()">
      <p x-text="translate`Hello ${person}, have you finished the ${project} project?`"></p>
    </div>
    <script src="https://unpkg.com/alpinejs"></script>
    <script src="https://unpkg.com/@aminnairi/translation/browser"></script>
    <script>
      "use strict";

      const {Translation} = window["@aminnairi/translation"];

      const translate = Translation.create({
        language: navigator.language || "",
        translations: {
          "Hello {person}, have you finished the {project} project?": {
            "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
            "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
          }
        }
      });

      const data = () => ({
        translate,
        person: "John DOE",
        project: "TOPSECRET"
      });
    </script>
  </body>
</html>
```

#### React

```javascript
import React, {useState, useCallback} from "react";
import {render} from "react-dom";
import {Translation} from "@aminnairi/translation";

const App = () => {
  const [person] = useState("John DOE");
  const [project] = useState("TOPSECRET");
  const translate = useCallback(Translation.create({
    language: navigator.language || "",
    translations: {
      "Hello {person}, have you finisheded the {project} project?": {
        "fr-FR": "Bonjour {person}, avez-vous terminé le project {project} ?"
      }
    }
  }), [Translation, navigator.language]);

  return <p>{translate`Hello ${person}, have you finisheded the ${project} project?`}</p>
};

render(<App />, document.getElementById("app"));
```

#### Preact

```javascript
import {h, render} from "preact";
import {useState, useCallback} from "preact/hooks";
import {Translation} from "@aminnairi/translation";

const App = () => {
  const [person] = useState("John DOE");
  const [project] = useState("TOPSECRET");
  const translate = useCallback(Translation.create({
    language: navigator.language || "",
    translations: {
      "Hello {person}, have you finisheded the {project} project?": {
        "fr-FR": "Bonjour {person}, avez-vous terminé le project {project} ?"
      }
    }
  }), [Translation, navigator.language]);

  return <p>{translate`Hello ${person}, have you finisheded the ${project} project?`}</p>
};

render(<App />, document.getElementById("root"));
```

#### Hyperapp

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module">
      import {Translation} from "https://unpkg.com/@aminnairi/translation/module";
      import {h, text, app} from "https://unpkg.com/hyperapp";

      const translate = Translation.create({
        language: navigator.language || "",
        translations: {
          "Hello {person}, have you finished the {project} project?": {
            "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
            "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
          }
        }
      });

      app({
        init: {person: "John DOE", project: "TOPSECRET"},
        view: ({person, project}) => h("p", {}, text(translate`Hello ${person}, have you finished the ${project} project?`)),
        node: document.getElementById("app")
      });
    </script>
  </body>
</html>
```

#### Svelte

```html
<script>
  import {Translation} from "@aminnairi/translation";

  const person = "John DOE";
  const project = "TOPSECRET";

  const translate = Translation.create({
    language: navigator.language || "",
    translations: {
      "Hello {person}, have you finished the {project} project?": {
        "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
      }
    }
  });
</script>

<main>
  <p>{translate`Hello ${person}, have you finished the ${project} project?`}</p>
</main>
```

## Requirements

- Node
