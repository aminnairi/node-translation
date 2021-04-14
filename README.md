# node-translation

Multi-lingual translation library.

[![Tests](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml) [![Code Style](https://github.com/aminnairi/node-translation/actions/workflows/codestyle.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/codestyle.yaml) [![NPM Badge](https://badgen.net/npm/v/@aminnairi/translation/)](https://www.npmjs.com/package/@aminnairi/translation) [![Bundle size](https://badgen.net/bundlephobia/minzip/@aminnairi/translation)](https://bundlephobia.com/result?p=@aminnairi/translation) [![Tree shaking support](https://badgen.net/bundlephobia/tree-shaking/@aminnairi/translation)](https://bundlephobia.com/result?p=@aminnairi/translation)

## Usage

### General

```javascript
"use strict";

const translate = Translation.create({
  language: navigator.language || "",
  translations: {
    "Hello {person}, did you finish the {project} project?": {
      "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
      "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
    }
  }
});

const person = "John DOE";
const project = "TOPSECRET";
const translation = translate`Hello ${person}, did you finish the ${project} project?`;
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
      <p x-text="translate`Hello ${person}, did you finish the ${project} project?`"></p>
    </div>
    <script src="https://unpkg.com/alpinejs"></script>
    <script src="https://unpkg.com/@aminnairi/translation/browser"></script>
    <script>
      "use strict";

      const {Translation} = window["@aminnairi/translation"];

      const translate = Translation.create({
        language: navigator.language || "",
        translations: {
          "Hello {person}, did you finish the {project} project?": {
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
      "Hello {person}, did you finish the {project} project?": {
        "fr-FR": "Bonjour {person}, avez-vous terminé le project {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
      }
    }
  }), [Translation.create, navigator.language]);

  return <p>{translate`Hello ${person}, did you finish the ${project} project?`}</p>
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
      "Hello {person}, did you finish the {project} project?": {
        "fr-FR": "Bonjour {person}, avez-vous terminé le project {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
      }
    }
  }), [Translation.create, navigator.language]);

  return <p>{translate`Hello ${person}, did you finish the ${project} project?`}</p>
};

render(<App />, document.getElementById("root"));
```

#### React Native

```javascript
import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, Platform, NativeModules } from 'react-native';
import {Translation} from "@aminnairi/translation";

const deviceLanguage = Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
  : NativeModules.I18nManager.localeIdentifier;

export default function App() {
  const [person] = useState("John DOE");
  const [project] = useState("TOPSECRET");
  const translate = useCallback(Translation.create({
    language: deviceLanguage.slice(0, 2),
    translations: {
      "Hello {person}, did you finish the {project} project?": {
        "en_GB": "Bonjour {person}, avez-vous terminé le project {project} ?"
      }
    }
  }), [Translation.create, deviceLanguage]);

  return (
    <View style={styles.container}>
      <Text>{translate`Hello ${person}, did you finish the ${project} project?`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

#### Hyperapp

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module">
      import {h, app, text} from "https://unpkg.com/hyperapp";
      import {Translation} from "https://unpkg.com/@aminnairi/translation/module";

      const translate = Translation.create({
        language: navigator.language || "",
        translations: {
          "Hello {person}, did you finish the {project} project?": {
            "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
            "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
          }
        }
      });

      app({
        init: {person: "John DOE", project: "TOPSECRET", translate},
        node: document.getElementById("app"),
        view: ({person, project, translate}) => h("main", {}, [
          h("p", {}, text(translate`Hello ${person}, did you finish the ${project} project?`))
        ])
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
      "Hello {person}, did you finish the {project} project?": {
        "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
      }
    }
  });
</script>

<main>
  <p>{translate`Hello ${person}, did you finish the ${project} project?`}</p>
</main>
```

#### Express.js

```javascript
import express from "express";
import {Translation} from "@aminnairi/translation";

const server = express();

server.use((request, response, next) => {
  request.translate = Translation.create({
    language: request.acceptsLanguages()[0] || "",
    translations: {
      "Hello {person}, did you finish the {project} project?": {
        "fr-FR": "Salut {person}, est-ce que tu as fini le projet {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
      }
    }
  });

  next();
});

server.get("/", (request, response) => {
  const person = "John DOE";
  const project = "TOPSECRET";
  const translation = request.translate`Hello ${person}, did you finish the ${project} project?`;

  response.json({success: true, data: translation});
});

server.listen(8080, "0.0.0.0", () => {
  console.log("server is listening");
});
```

## Requirements

- Node

## Pros

### Functional

This library has been made with function programming in mind. The source-code is using a functional style to disminish the amount of side-effects it can create, reduce the chance to introduce bugs and enhance its reliability.

### Scalable

You can start small and have a simple translation function that holds all of your translations, or you can split your translations in separated files and import them just as you would import any other JavaScript module. Create small translations functions that follow your components architecture.

### Testable

This library has been tested to reach the maximum coverage possible. So that you can focus on your translations and less on the tool itself. You are even encouraged to create small translation functions that you can then later test easily, no mocks to be made, no ugly hack to simulate the file system. Functions are the most easy peace of software you can test and this library aims at reducing this friction as well.

### Lighweight

This library is one of the smallest you can find in the package ecosystem of translation. Yet, this library can easily be used in many frameworks and libraries, or even just plain JavaScript and help you make your website internationalized quickly and efficiently.

### Reusable

Some library have taken the direction of using keys as the main identifier for referencing translation throughout the sources. Keys don't scale well because you need to come out with each time a new key name that can identify the text correctly. Why not use the text itself? By doing that, you reduce the friction and the speed at which a text can be translated and focus on the translation itself. Plus, you can't make the mistake of writing the same key twice for the same text since you are using the text itself.

### Dynamic

You could write three translation key for a single text if you have some time to spare. Or you could use this library and write only one key for one text to be translated since this library support static as well as dynamic translation. Meaning you can have nice little placeholders that will reference any text that can be changed. You can even reference a placeholder as many times as you want in the translation key as well as in the translation text. Just focus on the translation, not on the implementation.

### Polymorphic

Since this library is written in pure JavaScript, you can easily integrate it with almost any technology, whether it is a front-end framework or library, or a back-end web server library or framework. This library will find its way to help you get the most of internationalization. You can also open an issue if you want your favorite framework/library to be on the documentation examples and I'll try my best to provide with an example for that, or you can also help me make the documentation better!

### Smart

If you are supporting a multi-lingual website with many variants, you'll find your happinness in this library. It supports working with language and variants nicely and offers intelligent fallback when a variant is not found. You can have a translation for `fr` variants and have it work as a fallback for browsers that supports `fr-CH` or `fr-CA` variants. You can even have a text for a `fr-CA` variant and still make it work for browser that support a wider `fr` locale. And if you need specific idioms for specific variants, you can still have both `fr-CA` and `fr-CH` and they will work together nicely. All this processing is already baked in the library and you only have to ever focus on the translation and nothing else.

### Isomorphic

You just found a wonderful translation library for your back-end server app and want to use it on another front-end application. Same tool, different environment let's you focus more on the translation and less on the implementation details Since it does not rely on any Node.js specific API, only JavaScript standards. You want to store your translations on a file? You can! Just read them and feed them to the `Translation.create` builder. That's it. You want to fetch your translations from the internet on a front-end application? Why not! Just feed them again and you are good to go.

## Cons

### Vue

This library does not integrate well with Vue.js. Although I was a long-time Vue afficionado, it does not get well with template tag function, which is the heart of this library. The main reason is that you simply cannot evaluate template tag function in a Vue interpollation (double curly braces). There are way better libraries that make the work of translating a Vue app and I'm 100% sure you'll find something that will suit your needs.

## Issues

See [`issues`](../../issues).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## License

See [`LICENSE`](./LICENSE).
