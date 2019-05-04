window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

function errorHandler(e) {
    var msg = 'error';
    console.log('Error: ' + msg);
  }





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




  function onInitFs(fs) {

    fs.root.getFile('words.json', {create: true}, function(fileEntry) {
  
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {
  
        fileWriter.onwriteend = function(e) {
          var file = fileEntry.toURL();
          window.open(file, '_blank');
          console.log('Write completed.');
        };
  
        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };
  
        // Create a new Blob and write it to log.txt.
        var blob = new Blob(listOfWords, {type: 'text/plain'});
  
        fileWriter.write(blob);
  
      }, errorHandler);
  
    }, errorHandler);
  
  }
  
  window.requestFileSystem(window.TEMPORARY, 5*1024*1024, onInitFs, errorHandler);






  function display(){
    var mainDiv = document.getElementById('main');
    mainDiv.innerHTML = JSON.stringify(listOfWords, null, 4);    
}
display();

}
req.send();