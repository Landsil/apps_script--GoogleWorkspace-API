/*******************************************************************************************************************************************
 * Lists users in a G Suite domain.
 * Create a spreedsheet, name one sheet "AUTO_users" and enable API's as needed.
 * You will need to enable at least Direcory API and admin SDK
 * https://developers.google.com/admin-sdk/directory/v1/reference/users/list
 */
 
// Pulls User data from G Suite
function downloadUsers() {
  var pageToken;
  var page;
  
  // Position in sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var AUTO_users = SpreadsheetApp.setActiveSheet(ss.getSheetByName('AUTO_users'));
  
  // Clear content except header all the way to "K" column. TODO make it find cells with content and cleare those.
  AUTO_users.getRange('A2:K').clear();
  
  // This decided where to post. Starts after header.
  var lastRow = Math.max(AUTO_users.getRange(2, 1).getLastRow(),1);
  var index = 0;
  
  // Run the reqeust
  do {
    page = AdminDirectory.Users.list({
    customer: 'my_customer',
    projection: "FULL",
    maxResults: 50,
    orderBy: 'email',
    pageToken: pageToken
  });


//************************
// Assemble User's data
  var params = JSON.stringify(page.users);
  var data = JSON.parse(params);
  
  // Populate sheet
    if (data) {
      for(var i = 0; i < data.length; i++ ){
        
        // Sheet var name, get last lost + previus content, columnt. Set value based on position in JSON
        AUTO_users.getRange(index + lastRow + i, 1).setValue(data[i].orgUnitPath);
        AUTO_users.getRange(index + lastRow + i, 2).setValue(data[i].name.fullName);
        AUTO_users.getRange(index + lastRow + i, 3).setValue(data[i].primaryEmail);
        
        // This data sit in an array in JSON, you have to specify all steps to get there. Put it in >> (things||"" << to post empty space if there is no data.
        var title = (data[i] && data[i].organizations && data[i].organizations[0] && data[i].organizations[0].title)||" "; AUTO_users.getRange(index + lastRow + i, 4).setValue(title);
        var department = (data[i] && data[i].organizations && data[i].organizations[0] && data[i].organizations[0].department)||""; AUTO_users.getRange(index + lastRow + i, 5).setValue(department);
        var phone = (data[i] && data[i].phones && data[i].phones[0] && data[i].phones[0].value)||""; AUTO_users.getRange(index + lastRow + i, 6).setValue(phone);
        var manager = (data[i] && data[i].relations && data[i].relations[0] && data[i].relations[0].value)||""; AUTO_users.getRange(index + lastRow + i, 7).setValue(manager);
        //AUTO_users.getRange(index + lastRow + i, 8).setValue(data[i].thumbnailPhotoUrl);
        var Pronoun = (data[i] && data[i].customSchemas && data[i].customSchemas.Info && data[i].customSchemas.Info.Gender_pronoun)||""; AUTO_users.getRange(index + lastRow + i, 8).setValue(Pronoun);
        var Building = (data[i] && data[i].locations && data[i].locations.buildingId)||""; AUTO_users.getRange(index + lastRow + i, 9).setValue(Building);
      }
      index += 50;
    } else {
      Logger.log('No users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  
// This actually posts data when it's ready.
  AUTO_users.sort(1);
SpreadsheetApp.flush();
}
