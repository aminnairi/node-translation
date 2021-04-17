# @aminnairi/translation

Multi-lingual translation library.

[![Build](https://github.com/aminnairi/node-translation/actions/workflows/build.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/build.yaml) [![Tests](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/tests.yaml) [![Code Style](https://github.com/aminnairi/node-translation/actions/workflows/codestyle.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/codestyle.yaml) [![Audit](https://github.com/aminnairi/node-translation/actions/workflows/audit.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-translation/actions/workflows/audit.yaml)

[![NPM Badge](https://badgen.net/npm/v/@aminnairi/translation/)](https://www.npmjs.com/package/@aminnairi/translation) [![Bundle size](https://badgen.net/bundlephobia/minzip/@aminnairi/translation)](https://bundlephobia.com/result?p=@aminnairi/translation) [![Tree shaking support](https://badgen.net/bundlephobia/tree-shaking/@aminnairi/translation)](https://bundlephobia.com/result?p=@aminnairi/translation)

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

#### CommonJS

```javascript
const {Translation} = require("@aminnairi/translation");
```

### Deno

```javascript
import {Translation} from "https://unpkg.com/@aminnairi/translation/module";
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
    language: deviceLanguage,
    translations: {
      "Hello {person}, did you finish the {project} project?": {
        "fr-FR": "Bonjour {person}, avez-vous terminé le project {project} ?",
        "es-ES": "Hola {person}, ¿has terminado el proyecto {project}?"
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

## API

```javascript
/**
 * @description Create a translation function to help you with your internationalization
 * @returns {Function} A tag function that when called translate the text
 * @example
 * const translate = Translation.create({language, translations});
 */
const translate = Translation.create({
  /**
   * This is the language that is grabbed from the user, an OS setting, the browser, etc...
   * @type {string} The language with variant (or not) that will be used to translate any text
   * @example
   * Translation.create({language = "fr-FR", translations});
   * Translation.create({language = "fr", translations});
   * Translation.create({language = "fr_FR", translations});
   * Translation.create({language: navigator.language || "en-US", translations});
   */
  language: "fr-FR",
  /**
   * @description These are the translations texts that will also be used on your app
   * @type {object} An objet of all the texts to translate with their translations
   */
  translations: {
    // If the language does not match either one of these languages, it will return this text
    "Hello": {
      // If the language is either "fr-FR", "fr-fr", "fr_FR", "fr_fr" or "fr" it will match
      "fr-FR": "Bonjour",
      // If the language is either "es-ES", "es-es", "es_ES", "es_es" or "es" it will match
      "es-ES": "Hola"
    },
    // Text can have placeholder too, 
    "Hi {person}!": {
      // The translated text can reference these placeholders
      "fr-FR": "Salut {person} !",
      // See down bellow for examples
      "es-ES": "¡Hola {person}!"
    },
    // You can even repeat a placeholder multiple times
    "Do you love {bookName}? I love {bookName}, and {anotherBookName} also!": {
      // Translations can put the placeholder in any order, anywhere in the text
      "fr-FR": "Tu aimes {bookName} ? J'aime {bookName} et {anotherBookName} aussi !",
      // So that you can adapt the translation to the language idioms
      "es-ES": "¿Te gusta {bookName}? Me encantan {bookName} y {anotherBookName} también."
    }
  }
});

const person = "Jake";
const bookName = "Enemy of Terror";
const anotherBookName = "The Storm Oath";

translate`Hello`;
// "Bonjour"

translate`Hi ${person}!`;
// "Salut Jake !"

translate`Hello ${person}!`;
// "Hello Jake!" (untranslated because no match found)

translate`Do you love ${bookName}? I love ${bookName}, and ${anotherBookName} also!`;
// "Tu aimes Enemy of Terror ? J'aime Enemy of Terror et The Storm Oath aussi !"
```

## Requirements

- [Node](https://nodejs.org/)

## Pros

### Functional

This library has been made with functional programming in mind. The main goal is to disminish the amount of side-effects it can create, reduce the chance to introduce bugs and enhance its reliability.

### Scalable

You can start small and have a simple translation function that holds all of your translations, or you can split your translations in separated files and import them just as you would import any other JavaScript module. Or even create small translations functions that follow your components architecture. You handle this part of the work, you are in control of how you want your translations to be managed, the library will scale with you.

### Testable

This library has been tested to reach the maximum coverage possible. So that you can focus on your translations and less on the tool itself. You are even encouraged to create small translation functions that you can then later test easily, no mocks to be made, no ugly hack to simulate the file system. Functions are the most easy piece of software you can test and this library aims at reducing this friction as well so that you can have an app reliable in both its translations and its features.

### Lighweight

This library is one of the smallest you can find in the package ecosystem of translation. Yet, it can easily be used in many frameworks and libraries, or even just plain JavaScript and help you make your website internationalized quickly and efficiently.

### Reusable

Some library have taken the direction of using key identifiers for referencing translations throughout the sources. Keys don't scale well because you need to come out with a new name that is relevant each time. Why not use the text itself? By doing that, you reduce the friction and the speed at which a text can be translated and focus on the translation itself. Plus, you can't make the mistake of writing the same key twice for the same translation since you are using the text itself.

### Flexible

Whether the locale identifier comes from the operating system, a HTTP header or the user selection, this library will help you with your translation. It does not assume where to find the locale: you do. You are in total control with this library, yet it is powerful enough to help you translate your application in a single responsibility principle manner.

### Dynamic

Using variables is part of making our applications dynamic and is at the heart of any interesting application out there. But what about dynamic texts and translations? Are you willing to spend some time making three translations for only one text because it has some dynamic content? That is too much work and focus on the implementation, and less on the translation itself. With this library, you only have one text, and one (or more) translation for the language you want to support. That's it. Less work for you, means more time for interesting features.

### Polymorphic

Since this library is written in pure JavaScript, you can easily integrate it with almost any technology, whether it is a front-end framework or library, or a back-end web server library or framework. This library will find its way to help you get the most of internationalization. You can also open an issue if you want your favorite framework/library to be on the documentation examples and I'll try my best to provide with an example for that, or you can also help me make the documentation better!

### Smart

If you are supporting a multi-lingual website with many variants, you'll find your happinness in this library. It supports working with language and variants nicely and offers intelligent fallback when a variant is not found. You can have a translation for `fr` variants and have it work as a fallback for browsers that supports `fr-CH` or `fr-CA` variants. You can even have a text for a `fr-CA` variant and still make it work for browser that support a wider `fr` locale. And if you need specific idioms for specific variants, you can still have both `fr-CA` and `fr-CH` and they will work together nicely. All this processing is already baked in the library and you only have to ever focus on the translation and nothing else.

### Isomorphic

You just found a wonderful translation library for your back-end server app and want to use it on another front-end application. Same tool, different environment let's you focus more on the translation and less on the implementation details Since it does not rely on any Node.js specific API, only JavaScript standards. You want to store your translations on a file? You can! Just read them and feed them to the `Translation.create` builder. That's it. You want to fetch your translations from the internet on a front-end application? Why not! Just feed them again and you are good to go. You can even use this library with React Native with absolutely no friction!

### Helpful

When was the last time you saw helpful error messages in the console? Even if you make mistakes, nice and gentle errors are thrown with emphasis on precision and usefulness. Plus, it makes you gain some precious time by not having to traceback all the stack frames to search for the reason why it does not work. Never fear the errors again! 

### Semantic Versioning

This library highly relies on a strict semantic versioning of its package. If you upgrade to a minor version, it will always be backward compatible change. If you upgrade to a patch version, it will always be about a bug fixed and if you upgrade to a major version, it will mean that it will probably break the current API. Reliability and trust are at the heart of this library and no amout of popularity will change that.

## Cons

### Vue

This library does not integrate well with Vue.js. Although I was a long-time Vue afficionado, it does not get well with template tag function, which is the heart of this library. The main reason is that you simply cannot evaluate template tag function in a Vue interpollation (double curly braces). There are way better libraries that make the work of translating a Vue app and I'm 100% sure you'll find something that will suit your needs.

### Performance

Although performance has not been the main goal of this library, it should be pretty fast out of the box. Try not to store all of your translations in one object but rather have your translations splitted by pages or domains so that it will be less payload to get from the client-side. Less payload also means less to search for the translation function!

### Text as key

Having the text as a key has the benefit of introducing less keys, and is a more human way of seeing the translations. But this comes at the cost of making the translation sensible. If you mistakenly add a character, the translation will not match the one you wanted and will fallback to the text itself non-translated. This can be seen as both a pro or a con. You are sacrificing that in the benefit of having a much easier time to integrate dynamic translations. Be wise and do test your views whether it is manually or automatically!

### TypeScript

This library has no intent on being ever written in TypeScript, although you are free to come up with typings for this library if you want. Using text as keys means that TypeScript won't be of any help in helping you autocomplete or type check your texts. Plus, runtime type checking is already done for errors that come up in both development or production environments.

## Issues

See [`issues`](../../issues).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## License

See [`LICENSE`](./LICENSE).

## Security Policy

See [`SECURITY.md`](./SECURITY.md).
