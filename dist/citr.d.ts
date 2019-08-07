declare function validateCitationID(id: string): Boolean;

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
declare function extractCitations(file: string): string[];

declare const util: {
    "validateCitationID": typeof validateCitationID;
    "extractCitations": typeof extractCitations;
};
interface Citation {
    "prefix": string;
    "suffix": string;
    "id": string;
    "locator": string;
    "label": string;
    "suppress-author": boolean;
}
declare function parseSingle(citation: string): Citation[];
declare function makeCitation(citationArray: Citation[]): string;

export { makeCitation, parseSingle, util };
