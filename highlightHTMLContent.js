/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted 
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    for(let word of plainTextPositions){
        let startPos = word.start;
        let endPos = word.end;

        let itemText = plainText.slice(startPos, endPos);

        let textLength = itemText.length;

        let occurence = 0;
        let occurenceIndex = 0;

        for(let i=0; i<plainText.length; i++){
            let partText = plainText.slice(i, i+textLength);
            if(partText == itemText){
                occurence++;
                if(i == startPos){
                    occurenceIndex = occurence;
                }
            }
        }

        let htmlOccurence = 0;
        let htmlStartPos = null;

        for(let i=0; i<htmlContent.length; i++){
            let htmlText = htmlContent.slice(i, i+textLength);
            if(htmlText == itemText){
                htmlOccurence++;
                if(htmlOccurence == occurenceIndex){
                    htmlStartPos = i;
                }
            }
        }

        htmlContent = htmlContent.slice(0, htmlStartPos) + `<mark>${itemText}</mark>` + htmlContent.slice(htmlStartPos+textLength, htmlContent.length);
    }
    return htmlContent;
}

module.exports = highlightHTMLContent