module.exports = function(text) {
    return text.replace(/[aeou]/g, 'i').replace(/[AEOU]/g, 'I');
}