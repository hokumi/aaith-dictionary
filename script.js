
var url = "aaith-dictionary.xlsx";

var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";

req.onload = function() {
  var data = new Uint8Array(req.response);
  var workbook = XLSX.read(data, {type:"array"});

  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  var listOfWords = XLSX.utils.sheet_to_json(worksheet);

  exports = listOfWords;

  function display(){
    var mainDiv = document.getElementById('main');
    mainDiv.innerHTML = JSON.stringify(listOfWords, null, 4);    
}
display();

}
req.send();