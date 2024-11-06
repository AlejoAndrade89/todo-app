// utils/formatText.js
export const formatText = (text) => {
    // Reemplaza asteriscos (*) con elementos de lista
    let formattedText = text.replace(/^\* (.*$)/gim, '<li>$1</li>');
    // Reemplaza números con elementos de lista numerada
    formattedText = formattedText.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    // Envuelve listas de elementos en <ul> o <ol> tags
    formattedText = formattedText.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    formattedText = formattedText.replace(/(<ol><li>.*<\/li><\/ol>)/gim, '<ol>$1</ol>');
    // Reemplaza los saltos de línea con <br> tags
    formattedText = formattedText.replace(/\n/g, '<br />');
    return formattedText;
  };
  