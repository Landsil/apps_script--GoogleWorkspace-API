// Related to
// https://github.com/gorhill/uBlock/wiki/Deploying-uBlock-Origin
// http://raymondhill.net/ublock/adminSetting.html


/* 1. Save the script ( this one is self supporting at the moment, doesn't require main.gs from repository https://github.com/Landsil/apps_script--GSuite_API )
 * 2. Refresh Sheet
 * 3. Use new manu called "uBlock" --> Create Template
 * 4. You will be asked to give access to script
 * 5. In the template sheet add your websites to column "A" under "Websites" and use uBlock --> Generate JSON
 */ 

//************************************************************************************************************************************
// Create Menu in sheet when it's open
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
    name : "Create Template",
    functionName : "create_template"
    },
    {
    name : "Generate JSON",
    functionName : "make_JSON"
    }

  ];
  sheet.addMenu('uBlock', entries);
}


//************************************************************************************************************************************
// Create template sheet that will be used later on for everything.
function create_template() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//  var yourNewSheet = activeSpreadsheet.getSheetByName("AUTO_data");

  var yourNewSheet = activeSpreadsheet.insertSheet();
  yourNewSheet.setName("AUTO_data");
  var AUTO_data = activeSpreadsheet.getSheetByName("AUTO_data");
  
  // Create header
  AUTO_data.setFrozenRows(1)
  // Bold and center header
  AUTO_data.getRange("1:1").activate();
  AUTO_data.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold");
  // Content
  AUTO_data.getRange("A1").activate();
  AUTO_data.getCurrentCell().setValue("Websites");
  
  AUTO_data.getRange("A2").activate();
  AUTO_data.getCurrentCell().setValue("example1");
  AUTO_data.getRange("A3").activate();
  AUTO_data.getCurrentCell().setValue("example2");
  AUTO_data.getRange("A4").activate();
  AUTO_data.getCurrentCell().setValue("example3");
  
  AUTO_data.getRange("C2").activate();
  AUTO_data.getCurrentCell().setValue("Your string -->");
  AUTO_data.getRange("C3").activate();
  AUTO_data.getCurrentCell().setValue("Create a txt file with this string and use in Google Workspace or just manually copy paste");
  AUTO_data.getRange("C4").activate();
  AUTO_data.getCurrentCell().setValue("https://admin.google.com/ac/chrome/apps/user?f=ID.cjpalhdlnbpafiamejdnhcphjbkeiagm");
}


//************************************************************************************************************************************
// Take list of websites and asseble them into correct format
function make_JSON() {
  // Read data in column
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var AUTO_data = activeSpreadsheet.getSheetByName("AUTO_data");
  var string_Start = '{ "adminSettings": { "Value": "{ \\"whitelist\\":['
  var string_Middle = '],\\"netWhitelist\\":\\"'
  var string_End = '"}"} }'
  
  
  // Read data from "A2:A" and flatten from 2D array to 1D array
  var url_list =  AUTO_data.getRange("A2:A"+AUTO_data.getLastRow()).getValues().flat();
//  Logger.log("url_list")
//  Logger.log(url_list)
  
  
  // Get oryginal list and edit all URL's to correct format.
  var whitelist_values = url_list.map((url) => '\\"' + url + '\\"');
//  Logger.log("whitelist_values")
//  Logger.log(whitelist_values)
  
  
  // Get oryginal list and edit all URL's to correct format, first one ( index 0 ) has to be diffrent.
  var netWhitelist_values = url_list.map((url, index) => 
     {
     if (index === 0) return (url + '\\');
     return ('\\n' + url + '\\');
     }).join('');
//  Logger.log("")
//  Logger.log("netWhitelist_values")
//  Logger.log(netWhitelist_values)

  // Let's assemple final string.
  var output = string_Start + whitelist_values + string_Middle + netWhitelist_values + string_End

  AUTO_data.getRange("D2").activate();
  AUTO_data.getCurrentCell().setValue(output);
  
}
