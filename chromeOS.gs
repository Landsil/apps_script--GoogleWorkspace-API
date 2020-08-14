/*******************************************************************************************************************************************
 * Lists all ChromeOS in a G Suite domain.
 * Create a spreedsheet, name one sheer "AUTO_ChromeOS" enable API's as needed.
 * You will need to enable at least Direcory API and admin SDK
 */
// Pulls Device data from G Suite
function downloadChromeOS() {
  var pageToken;
  var page;
  
  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var AUTO_ChromeOS = SpreadsheetApp.setActiveSheet(ss.getSheetByName('AUTO_ChromeOS'));
  
  // Clear content except header all the way to "K" column. TODO make it find cells with content and cleare those.
  AUTO_ChromeOS.getRange('A2:Z').clear();
  
  // This decided where to post. Starts after header.
  var lastRow = Math.max(AUTO_ChromeOS.getRange(2, 1).getLastRow(),1);
  var index = 0;
  
  // Run the reqeust
  do {
    page = AdminDirectory.Chromeosdevices.list('my_customer',{
    maxResults: 50,
    projection: 'FULL',
    pageToken: pageToken
  });

//************************
// Assemble Device data
  var params = JSON.stringify(page.chromeosdevices);
  var data = JSON.parse(params);
  
  // Populate sheet
    if (data) {
      for(var i = 0; i < data.length; i++ ){
        
        // Sheet var name, get last lost + previus content, columnt. Set value based on position in JSON
        // Some of the data sits in an array in JSON, you have to specify all steps to get there. Put it in >> (things||"" << to post empty space if there is no data.
        // Full list of suported endpoints: https://developers.google.com/admin-sdk/directory/v1/reference/chromeosdevices

        AUTO_ChromeOS.getRange(index + lastRow + i, 1).setValue(data[i].orgUnitPath);
        var model = (data[i] && data[i].model)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 2).setValue(model);
        var annotatedAssetId = (data[i] && data[i].annotatedAssetId)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 3).setValue(annotatedAssetId);
        var annotatedLocation = (data[i] && data[i].annotatedLocation)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 4).setValue(annotatedLocation);
        var annotatedUser = (data[i] && data[i].annotatedUser)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 5).setValue(annotatedUser);
        var recentUsersEmail_0 = (data[i] && data[i].recentUsers && data[i].recentUsers[0] && data[i].recentUsers[0].email)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 6).setValue(recentUsersEmail_0);
        var recentUsersEmail_1 = (data[i] && data[i].recentUsers && data[i].recentUsers[1] && data[i].recentUsers[1].email)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 7).setValue(recentUsersEmail_1);
        var recentUsersEmail_2 = (data[i] && data[i].recentUsers && data[i].recentUsers[2] && data[i].recentUsers[2].email)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 8).setValue(recentUsersEmail_2);
        var bootMode = (data[i] && data[i].bootMode)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 9).setValue(bootMode);
        var kind = (data[i] && data[i].kind)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 10).setValue(kind);
        var osVersion = (data[i] && data[i].osVersion)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 11).setValue(osVersion);
        var platformVersion = (data[i] && data[i].platformVersion)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 12).setValue(platformVersion);
        var serialNumber = (data[i] && data[i].serialNumber)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 13).setValue(serialNumber);
        var status = (data[i] && data[i].status)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 14).setValue(status);
        var supportEndDate = (data[i] && data[i].supportEndDate)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 15).setValue(supportEndDate);
        var lastSync = (data[i] && data[i].lastSync)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 16).setValue(lastSync);
        var macAddress = (data[i] && data[i].macAddress)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 17).setValue(macAddress);
        var ethernetMacAddress = (data[i] && data[i].ethernetMacAddress)||""; AUTO_ChromeOS.getRange(index + lastRow + i, 18).setValue(ethernetMacAddress);
        
        
        //debug >> Full answer
        // AUTO_ChromeOS.getRange(index + lastRow + i, 10).setValue(params);
      }
      index += 50;
    } else {
      Logger.log('No Devices found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  
// This actually posts data when it's ready.
  AUTO_ChromeOS.sort(1);
SpreadsheetApp.flush();
}
