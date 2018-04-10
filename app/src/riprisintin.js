module.exports = function(text) {
    return text.toLowerCase()
        .replace(/[aeo]/g, 'i')
        .replace(/(?!qu)(.)u/g, '$1i')
        .replace(/[áéó]/g, 'í')
        .replace(/(?!qú)(.)ú/g, '$1í')
        .replace(/[àèò]/g, 'ì')
        .replace(/(?!qù)(.)ù/g, '$1ì')
        .replace(/[äëö]/g, 'ï')
        .replace(/(?!qü)(.)ü/g, '$1ï');
}