/*!
 * BEGIN HEADER
 *
 * Contains:    Validation utilities
 * Maintainer:  Hendrik Erz
 * License:     GNU GPL v3
 *
 * Description:     In this file, a variety of validation functions are located. One is also exposed
 *      at the module level used to validate citation IDs.
 *
 * END HEADER
 */
function validateFullCitation(citation) {
    return /^\[([^[\]]*@[^[\]]+)\]$/.test(citation);
}
function validateCitationPart(citation) {
    return citation.split('@').length === 2;
}
function validateCitationID(id) {
    return /^@?[a-zA-Z0-9_][a-zA-Z0-9_:.#$%&\-+?<>~/]*$/.test(id);
}

const en = {
    "book": "book",
    "books": "book",
    "chapter": "chapter",
    "chapters": "chapter",
    "column": "column",
    "columns": "column",
    "figure": "figure",
    "figures": "figure",
    "folio": "folio",
    "folios": "folio",
    "number": "issue",
    "numbers": "issue",
    "line": "line",
    "lines": "line",
    "note": "note",
    "notes": "note",
    "opus": "opus",
    "opera": "opus",
    "page": "page",
    "pages": "page",
    "paragraph": "paragraph",
    "paragraphs": "paragraph",
    "part": "part",
    "parts": "part",
    "section": "section",
    "sections": "section",
    "sub verbo": "sub verbo",
    "sub verbis": "sub verbo",
    "verse": "verse",
    "verses": "verse",
    "volume": "volume",
    "volumes": "volume",
    "bk.": "book",
    "bks": "book",
    "chap.": "chapter",
    "chaps": "chapter",
    "col.": "column",
    "cols": "column",
    "fig.": "figure",
    "figs": "figure",
    "fol.": "folio",
    "fols": "folio",
    "no.": "issue",
    "nos.": "issue",
    "l.": "line",
    "ll.": "line",
    "n.": "note",
    "nn.": "note",
    "op.": "opus",
    "opp.": "opus",
    "p.": "page",
    "pp.": "page",
    "para.": "paragraph",
    "paras": "paragraph",
    "pt.": "part",
    "pts": "part",
    "sec.": "section",
    "secs": "section",
    "s.v.": "sub verbo",
    "s.vv.": "sub verbo",
    "v.": "verse",
    "vv.": "verse",
    "vol.": "volume",
    "vols": "volume",
    "¶": "paragraph",
    "¶¶": "paragraph",
    "§": "section",
    "§§": "section"
};

const de = {
    "Buch": "book",
    "Bücher": "book",
    "Kapitel": "chapter",
    "Spalte": "column",
    "Spalten": "column",
    "Abbildung": "figure",
    "Abbildungen": "figure",
    "Blatt": "folio",
    "Blätter": "folio",
    "Nummer": "issue",
    "Nummern": "issue",
    "Zeile": "line",
    "Zeilen": "line",
    "Note": "note",
    "Noten": "note",
    "Opus": "opus",
    "Opera": "opus",
    "Seite": "page",
    "Seiten": "page",
    "Absatz": "paragraph",
    "Absätze": "paragraph",
    "Teil": "part",
    "Teile": "part",
    "Abschnitt": "section",
    "Abschnitte": "section",
    "sub verbo": "sub verbo",
    "sub verbis": "sub verbo",
    "Vers": "verse",
    "Verse": "verse",
    "Band": "volume",
    "Bände": "volume",
    "B.": "book",
    "Kap.": "chapter",
    "Sp.": "column",
    "Abb.": "figure",
    "Fol.": "folio",
    "Nr.": "issue",
    "Z.": "line",
    "N.": "note",
    "op.": "opus",
    "S.": "page",
    "Abs.": "paragraph",
    "Abschn.": "section",
    "s.&#160;v.": "sub verbo",
    "s.&#160;vv.": "sub verbo",
    "V.": "verse",
    "Bd.": "volume",
    "Bde.": "volume",
    "¶": "paragraph",
    "¶¶": "paragraph",
    "§": "section",
    "§§": "section",
};

const fr = {
    "livre": "book",
    "livres": "book",
    "chapitre": "chapter",
    "chapitres": "chapter",
    "colonne": "column",
    "colonnes": "column",
    "figure": "figure",
    "figures": "figure",
    "folio": "folio",
    "folios": "folio",
    "numéro": "issue",
    "numéros": "issue",
    "ligne": "line",
    "lignes": "line",
    "note": "note",
    "notes": "note",
    "opus": "opus",
    "page": "page",
    "pages": "page",
    "paragraphe": "paragraph",
    "paragraphes": "paragraph",
    "partie": "part",
    "parties": "part",
    "section": "section",
    "sections": "section",
    "sub verbo": "sub verbo",
    "sub verbis": "sub verbo",
    "verset": "verse",
    "versets": "verse",
    "volume": "volume",
    "volumes": "volume",
    "liv.": "book",
    "chap.": "chapter",
    "col.": "column",
    "fig.": "figure",
    "fᵒ": "folio",
    "fᵒˢ": "folio",
    "nᵒ": "issue",
    "nᵒˢ": "issue",
    "l.": "line",
    "n.": "note",
    "op.": "opus",
    "p.": "page",
    "paragr.": "paragraph",
    "part.": "part",
    "sect.": "section",
    "s.&#160;v.": "sub verbo",
    "s.&#160;vv.": "sub verbo",
    "v.": "verse",
    "vol.": "volume2",
    "§": "section",
};

/*!
 * BEGIN HEADER
 *
 * Contains:    Utility functions to retrieve the locator of citations.
 * Maintainer:  Hendrik Erz
 * License:     GNU GPL v3
 *
 * Description:     These are utility functions that help in retrieving the
 *      locator from a given citation string. ATTENTION these
 *      functions are not to be used outside of the Citr module
 *      as they require a very specific input string format!
 *
 * END HEADER
 */
const localeMappings = [en, de, fr];
function retrieveLocator(locatorString) {
    for (let locale of localeMappings) {
        for (let loc of Object.keys(locale)) {
            if (locatorString.indexOf(loc) === 0)
                return { "label": locale[loc], "natural": loc };
        }
    }
    return { "label": "", "natural": "" };
}
function extractLocator(afterKey) {
    let retObject = {
        "locator": "",
        "label": "page",
        "suffix": ""
    };
    if (afterKey[0] === ',')
        afterKey = afterKey.substr(1).trim();
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(afterKey[0]))) {
        let locator = /^\d+(-\d+)?/.exec(afterKey);
        if (locator) {
            retObject.locator = locator[0];
            retObject.suffix = afterKey.replace(locator[0], '');
        }
        return retObject;
    }
    let result = retrieveLocator(afterKey);
    if (result.label === "") {
        retObject.suffix = afterKey;
        return retObject;
    }
    retObject.label = result.label;
    afterKey = afterKey.replace(result.natural, '').trim();
    let splitIndex = 0;
    let locatorRE = /(\d+(?:-\d+)?)/g;
    while (locatorRE.exec(afterKey) !== null) {
        splitIndex = locatorRE.lastIndex;
    }
    retObject.locator = afterKey.substr(0, splitIndex);
    retObject.suffix = afterKey.substr(splitIndex + 1);
    return retObject;
}

/*!
 * BEGIN HEADER
 *
 * Contains:    This contains a utility function to extract all citations from a given text.
 * Maintainer:  Hendrik Erz
 * License:     GNU GPL v3
 *
 * Description:     Simply pass a full Markdown file in here to extract all citations as an array.
 *
 * END HEADER
 */
function extractCitations(file) {
    let allCitations = [];
    let citationRE = /(\[([^[\]]*@[^[\]]+)\])/g;
    let citation;
    while ((citation = citationRE.exec(file)) !== null) {
        if (!validateFullCitation(citation[0]))
            continue;
        allCitations.push(citation[0]);
    }
    return allCitations;
}

const util = {
    "validateCitationID": validateCitationID,
    "extractCitations": extractCitations
};
function parseSingle(citation) {
    if (validateCitationID(citation) && citation[0] === '@') {
        return [{
                "prefix": '',
                "suffix": '',
                "id": citation.substr(1),
                "locator": '',
                "label": 'page',
                "suppress-author": false
            }];
    }
    if (!validateFullCitation(citation))
        throw new Error(`Invalid Citation - Invalid citation passed: ${citation}.`);
    let returnCitations = [];
    let _citation = citation.substr(1, citation.length - 2).split(';');
    for (let c of _citation) {
        if (c === '')
            continue;
        if (!validateCitationPart(c))
            throw new Error(`No key or multiple keys Found - Invalid citation passed: ${c}.`);
        let prefix = c.split('@')[0].trim();
        let suppressAuthor = c.indexOf('@') > 0 && c[c.indexOf('@') - 1] === '-';
        if (suppressAuthor)
            prefix = prefix.substr(0, prefix.length - 1).trim();
        let extractedKey = /^([a-zA-Z0-9_][a-zA-Z0-9_:.#$%&\-+?<>~/]*)/.exec(c.split('@')[1]);
        if (extractedKey === null)
            throw new Error(`Invalid Key - Invalid citation passed: ${c}`);
        let citeKey = extractedKey[1];
        let afterKey = extractedKey.input.substr(citeKey.length).trim();
        let { suffix, locator, label } = extractLocator(afterKey);
        returnCitations.push({
            "prefix": prefix,
            "suffix": suffix,
            "id": citeKey,
            "locator": locator,
            "label": label,
            "suppress-author": suppressAuthor
        });
    }
    return returnCitations;
}
function makeCitation(citationArray) {
    if (!Array.isArray(citationArray))
        citationArray = [citationArray];
    let returnArray = [];
    for (let csl of citationArray) {
        let res = '';
        if (!csl.hasOwnProperty('id'))
            throw new Error('Citation had no ID given!');
        if (csl.hasOwnProperty('prefix'))
            res += csl.prefix + ' ';
        if (csl.hasOwnProperty('suppress-author') && csl['suppress-author'])
            res += '-';
        res += '@' + csl.id;
        if (csl.hasOwnProperty('label') && csl.hasOwnProperty('locator'))
            res += ', ' + csl.label + ' ' + csl.locator;
        if (csl.hasOwnProperty('suffix'))
            res += ' ' + csl.suffix;
        returnArray.push(res.trim());
    }
    return `[${returnArray.join('; ')}]`;
}

export { makeCitation, parseSingle, util };
