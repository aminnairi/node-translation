import {describe, it} from "mocha";
import {expect} from "chai";
import {Translation} from "../sources/main.mjs";

describe("main", () => {
  it("should expose a named object called Translation", () => {
    expect(Translation).to.be.an("object");
  });

  it("should expose a create function that accepts one argument", () => {
    expect(Translation.create).to.be.a("function").of.length(1);
  });

  it("should throw if passing more than one arguments", () => {
    expect(() => Translation.create({}, {})).to.throw(Error);
  });

  it("should throw if the first argument is an array", () => {
    expect(() => Translation.create([])).to.throw(TypeError);
  });

  it("should throw if the first argument is not an object", () => {
    const options = 123;

    expect(() => Translation.create(options)).to.throw(TypeError);
  });

  it("should throw if the language is not a string", () => {
    const language = 123;

    expect(() => Translation.create({language})).to.throw(TypeError);
  });

  it("should throw if the translations is an array", () => {
    const language = "fr-FR";
    const translations = [];

    expect(() => Translation.create({language, translations})).to.throw(TypeError);
  });

  it("should throw if the translations is an object of arrays", () => {
    const language = "fr-FR";
    const translations = {"Hello": []};

    expect(() => Translation.create({language, translations})).to.throw(TypeError);
  });

  it("should throw if the translations is not object of object", () => {
    const language = "fr-FR";
    const translations = {"Hello": 123};

    expect(() => Translation.create({language, translations})).to.throw(TypeError);
  });

  it("should throw if the translations is not object of object containing strings", () => {
    const language = "fr-FR";
    const translations = {"Hello": {"fr-FR": 123}};

    expect(() => Translation.create({language, translations})).to.throw(TypeError);
  });

  it("should throw if the options contain unwanted options", () => {
    const language = "fr-FR";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const unwanted = "bad";

    expect(() => Translation.create({language, translations, unwanted})).to.throw(Error);
  });

  it("should throw if the translate function is not called as a tag function", () => {
    const language = "fr-FR";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(() => translate(123)).to.throw(Error);
  });

  it("should return the fallback translation if the translation text is not found", () => {
    const language = "fr-FR";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Good bye`).to.deep.equal("Good bye");
  });

  it("should return the fallback translation if the translation language is not found", () => {
    const language = "es-ES";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Hello`).to.deep.equal("Hello");
  });

  it("should return the fallback translation if the translation language is not found", () => {
    const language = "es-ES";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Hello`).to.deep.equal("Hello");
  });

  it("should return the translation if the translation language is a subset of the target language", () => {
    const language = "fr";
    const translations = {"Hello": {"fr-FR": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Hello`).to.deep.equal("Bonjour");
  });

  it("should return the translation if the translation language is a superset of the target language", () => {
    const language = "fr-FR";
    const translations = {"Hello": {"fr": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Hello`).to.deep.equal("Bonjour");
  });

  it("should return the translation if the translation language is in the iOS or Android (React Native) format", () => {
    const language = "fr_FR";
    const translations = {"Hello": {"fr": "Bonjour"}};
    const translate = Translation.create({language, translations});

    expect(translate`Hello`).to.deep.equal("Bonjour");
  });

  it("should return the translation with variables correctly", () => {
    const language = "fr-FR";
    const translations = {"Hello {person}, have you finished the {project} project?": {"fr": "Bonjour {person}, as-tu fini le projet {project} ?"}};
    const translate = Translation.create({language, translations});
    const person = "John DOE";
    const project = "TOPSECRET";

    expect(translate`Hello ${person}, have you finished the ${project} project?`).to.deep.equal("Bonjour John DOE, as-tu fini le projet TOPSECRET ?");
  });

  it("should return the text for a bunch of random string when the language matches", () => {
    const createRandomStringOfLength = length => Array.from(Array(length)).map(() => String.fromCharCode(Math.floor(Math.random() * 100 + 21))).join("");
    const randomStrings = Array.from(Array(10)).map(() => createRandomStringOfLength(15));
    const language = "en";

    randomStrings.forEach(randomString => {
      const translations = {"Random string": {"en": randomString}};
      const translate = Translation.create({language, translations});
      expect(translate`Random string`).to.deep.equal(randomString);
    });
  });

  it("should never return the text for a bunch of random string when the language does not match", () => {
    const createRandomStringOfLength = length => Array.from(Array(length)).map(() => String.fromCharCode(Math.floor(Math.random() * 100 + 21))).join("");
    const randomStrings = Array.from(Array(10)).map(() => createRandomStringOfLength(15));
    const language = "en";

    randomStrings.forEach(randomString => {
      const translations = {"Random string": {"fr": randomString}};
      const translate = Translation.create({language, translations});
      expect(translate`Random string`).to.deep.equal("Random string");
    });
  });
});
