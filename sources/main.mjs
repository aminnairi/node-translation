const List = {
  shallowEquals: (firstList, secondList) => {
    return firstList.every((firstListItem, firstListIndex) => {
      const secondListItem = secondList[firstListIndex];
      return firstListItem === secondListItem;
    });
  }
};

export const Translation = {
  create: (options, ...unwantedArguments) => {
    unwantedArguments.forEach(unwantedArgument => {
      throw new Error(`Expected only one argument in Translation.create(options), received ${JSON.stringify(unwantedArgument)}`);
    });

    if (typeof options !== "object" || Array.isArray(options)) {
      throw new TypeError(`Expected options to be an object in Translation.create(options), received ${JSON.stringify(options)}`);
    }

    const {translations, language, ...unwantedOptions} = options;

    if (typeof language !== "string") {
      throw new TypeError(`language is not a string in Translation.create({language}), received ${JSON.stringify(language)}`);
    }

    if (typeof translations !== "object" || Array.isArray(translations)) {
      throw new TypeError(`translations is not an object in Translation.create({translations}), reiceived ${JSON.stringify(translations)}`);
    }

    Object.entries(translations).forEach(([translationKey, translationValue]) => {
      if (typeof translationValue !== "object" || Array.isArray(translationValue)) {
        throw new TypeError(`translation for ${JSON.stringify(translationKey)} is not an object, received ${JSON.stringify(translationValue)}`);
      }

      Object.entries(translationValue).forEach(([translationLanguage, translationLanguageValue]) => {
        if (typeof translationLanguageValue !== "string") {
          throw new TypeError(`translation value for ${JSON.stringify(translationKey)} for language ${JSON.stringify(translationLanguage)} is not a string, received ${JSON.stringify(translationLanguageValue)}`);
        }
      });
    });

    Object.entries(unwantedOptions).forEach(([unwantedOption, unwantedOptionValue]) => {
      throw new Error(`Expected only translations and language options in Translation.create({translations, language}), received ${JSON.stringify(unwantedOption)} with value ${JSON.stringify(unwantedOptionValue)}`);
    });

    return (strings, ...variables) => {
      if (!Array.isArray(strings) || strings.some(string => typeof string !== "string") || variables.some(value => typeof value !== "string")) {
        throw new Error("Function has not been called as a tag function");
      }

      const foundTranslationKey = Object.keys(translations).find(sentence => {
        return List.shallowEquals(sentence.split(/\{.+?\}/gu), strings);
      });

      const fallbackTranslation = strings.slice(1).reduce((concatenation, string, stringIndex) => `${concatenation}${variables[stringIndex]}${string}`, strings[0]);

      if (typeof foundTranslationKey === "undefined") {
        return fallbackTranslation;
      }

      const foundTranslationLanguage = Object.entries(translations[foundTranslationKey]).find(([translationLanguage]) => {
        const [languageFamily, languageVariant] = language.toLowerCase().split("-").map(languagePart => languagePart.trim());
        const [translationLanguageFamily, translationLanguageVariant] = translationLanguage.toLowerCase().split("-").map(languagePart => languagePart.trim());

        if (typeof languageFamily !== "undefined" && typeof translationLanguageFamily !== "undefined") {
          if (typeof languageVariant !== "undefined" || typeof translationLanguageVariant !== "undefined") {
            if (languageVariant === translationLanguageVariant && languageFamily === translationLanguageFamily) {
              return true;
            } 
          }

          if (languageFamily === translationLanguageFamily) {
            return true;
          }
        }

        return false;
      });

      if (typeof foundTranslationLanguage === "undefined") {
        return fallbackTranslation;
      }

      const foundTranslation = foundTranslationLanguage[1];

      if (typeof foundTranslation === "undefined") {
        return fallbackTranslation;
      }

      return (foundTranslationKey.match(/\{.+?\}/gu) || []).reduce((previousTranslation, translationVariable, translationVariableIndex) => previousTranslation.replace(new RegExp(translationVariable.replace("{", "\\{").replace("}", "\\}"), "gu"), variables[translationVariableIndex]), foundTranslation);
    };
  }
};
