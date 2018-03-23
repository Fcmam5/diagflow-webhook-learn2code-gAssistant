class Tutorial {
  constructor(title, link, programming_lang, nature, language) {
    this.title = title
    this.link = link
    this.programming_lang  = programming_lang
    this.nature = nature
    this.language = language
  }

  getRessource() {
    return String(programming_lang + " tutorial \n" + title + "\n" + link);
  }
}

module.exports = Tutorial;
