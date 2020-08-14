// Menu options
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : 'Users',
    functionName : 'downloadUsers'
  },
  {
    name : 'Groups',
    functionName : 'downloadGroups'
  },
  {
    name : 'ChromeOS',
    functionName : 'downloadChromeOS'
  }
                ];
  sheet.addMenu('Download', entries);
}
