/******************************************************************************************************************




*/
// Pulls Groups data from Workspace
function downloadGroups() {
  var pageToken;
  var page;
  
  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var AUTO_groups = SpreadsheetApp.setActiveSheet(ss.getSheetByName('AUTO_groups'));
  
  // Clear content except header all the way to "K" column. TODO make it find cells with content and cleare those.
  AUTO_groups.getRange('A2:F').clear();
  
  // This decided where to post. Starts after header.
  var column = AUTO_groups.getRange('A1:A').getValues();
  var lastRow = column.filter(String).length;
  var lastColumn = AUTO_groups.getLastColumn();
  var index = 1;
  do {
    page = AdminDirectory.Groups.list({
      customer: 'my_customer',
      maxResults: 50,
      pageToken: pageToken
    });

    var groups = page.groups;
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        AUTO_groups.getRange((index + lastRow + i), 1).setValue(group.name);
        AUTO_groups.getRange((index + lastRow + i), 2).setValue(group.email);
        AUTO_groups.getRange((index + lastRow + i), 3).setValue(group.directMembersCount);
        AUTO_groups.getRange((index + lastRow + i), 4).setValue(group.description);


        var aliases = (group.aliases || []).join(', '); 
        AUTO_groups.getRange((index + lastRow + i), 5).setValue(aliases);  // TODO fix to show all aliases


        
      }
      index += 50;
    } else {
      Logger.log('No groups found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  
  AUTO_groups.sort(1);
SpreadsheetApp.flush();
}
