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
// Create template sheet that will be used later on for everything.
function create_template_v2() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //  var yourNewSheet = activeSpreadsheet.getSheetByName("AUTO_data_v2");

  var yourNewSheet = activeSpreadsheet.insertSheet();
  yourNewSheet.setName("AUTO_data_v2");
  var AUTO_data_v2 = activeSpreadsheet.getSheetByName("AUTO_data_v2");

  // Create header
  AUTO_data_v2.setFrozenRows(1)
  // Bold and center header
  AUTO_data_v2.getRange("1:1").activate();
  AUTO_data_v2.getActiveRangeList().setHorizontalAlignment("center").setFontWeight("bold");
  // Content
  AUTO_data_v2.getRange("A1").activate();
  AUTO_data_v2.getCurrentCell().setValue("Websites");

  AUTO_data_v2.getRange("A2").activate();
  AUTO_data_v2.getCurrentCell().setValue("example1");
  AUTO_data_v2.getRange("A3").activate();
  AUTO_data_v2.getCurrentCell().setValue("example2");
  AUTO_data_v2.getRange("A4").activate();
  AUTO_data_v2.getCurrentCell().setValue("example3");

  AUTO_data_v2.getRange("C2").activate();
  AUTO_data_v2.getCurrentCell().setValue("Your string -->");
  AUTO_data_v2.getRange("C3").activate();
  AUTO_data_v2.getCurrentCell().setValue("Create a txt file with this string and use in Google Workspace or just manually copy paste");
  AUTO_data_v2.getRange("C4").activate();
  AUTO_data_v2.getCurrentCell().setValue("https://admin.google.com/ac/chrome/apps/user?f=ID.cjpalhdlnbpafiamejdnhcphjbkeiagm");
}


//************************************************************************************************************************************
// Take list of websites and asseble them into correct format
function make_JSON_v2() {
  // Read data in column
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var AUTO_data_v2 = activeSpreadsheet.getSheetByName("AUTO_data_v2");

  // Read data from "A2:A" and flatten from 2D array to 1D array
  var url_list = AUTO_data_v2.getRange("A2:A" + AUTO_data_v2.getLastRow()).getValues().flat();

  var payload = {
    "toAdd": {
      "Value":
      {
        "trustedSiteDirectives": url_list,
      }
    }
  }

  AUTO_data_v2.getRange("D2").activate();
  AUTO_data_v2.getCurrentCell().setValue(JSON.stringify(payload));

}
