module.exports = function(text){
    if(text.length < 30) {
      return {top: '', bottom: text};
    } else {
      var middle = Math.floor(text.length / 2);
      var before = text.lastIndexOf(' ', middle);
      var after = text.indexOf(' ', middle + 1);
  
      if (middle - before < after - middle) {
          middle = before;
      } else {
          middle = after;
      }
  
      return {top: text.substr(0, middle), bottom: text.substr(middle + 1)};
    }
  }