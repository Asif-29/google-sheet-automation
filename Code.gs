

// Asif Hassan || Google Sheet Automation

// ========================================================================================================================

//Declare a function to validate the entry made by user in UserForm

function validateEntry() {

  var myGooglSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 
  var shUserForm = myGooglSheet.getSheetByName("User Form"); //delcare a variable and set with the User Form worksheet

  //to create the instance of the user-interface environment to use the messagebox features
  var ui = SpreadsheetApp.getUi();

  //Assigning white as default background color

  shUserForm.getRange("C7").setBackground('#FFFFFF');
  shUserForm.getRange("C9").setBackground('#FFFFFF');
  shUserForm.getRange("C11").setBackground('#FFFFFF');
  shUserForm.getRange("C13").setBackground('#FFFFFF');
  shUserForm.getRange("C15").setBackground('#FFFFFF');
  shUserForm.getRange("C17").setBackground('#FFFFFF');

  //Validating Employee ID
  if (shUserForm.getRange("C7").isBlank() == true) {
    ui.alert("Please enter Employee ID.");
    shUserForm.getRange("C7").activate();
    shUserForm.getRange("C7").setBackground('#FF0000');
    return false;
  }

  //Validating Employee Name
  else if (shUserForm.getRange("C9").isBlank() == true) {
    ui.alert("Please enter Employee Name.");
    shUserForm.getRange("C9").activate();
    shUserForm.getRange("C9").setBackground('#FF0000');
    return false;
  }
  //Validating Gender
  else if (shUserForm.getRange("C11").isBlank() == true) {
    ui.alert("Please select Gender from the drop-down.");
    shUserForm.getRange("C11").activate();
    shUserForm.getRange("C11").setBackground('#FF0000');
    return false;
  }
  //Validating Email ID
  else if (shUserForm.getRange("C13").isBlank() == true) {
    ui.alert("Please enter a valid Email ID.");
    shUserForm.getRange("C13").activate();
    shUserForm.getRange("C13").setBackground('#FF0000');
    return false;
  }
  //Validating Department
  else if (shUserForm.getRange("C15").isBlank() == true) {
    ui.alert("Please select Department from the drop-down.");
    shUserForm.getRange("C15").activate();
    shUserForm.getRange("C15").setBackground('#FF0000');
    return false;
  }
  //Validating Address
  else if (shUserForm.getRange("C17").isBlank() == true) {
    ui.alert("Please enter address.");
    shUserForm.getRange("C17").activate();
    shUserForm.getRange("C17").setBackground('#FF0000');
    return false;
  }

  return true;

}


// ========================================================================================================================

// Function to submit the data to Database sheet
function submitData() {

  var myGooglSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 

  var shUserForm = myGooglSheet.getSheetByName("User Form"); //delcare a variable and set with the User Form worksheet

  var datasheet = myGooglSheet.getSheetByName("Database"); ////delcare a variable and set with the Database worksheet

  //to create the instance of the user-interface environment to use the messagebox features
  var ui = SpreadsheetApp.getUi();

  // Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
  // close the dialog by clicking the close button in its title bar.
  var response = ui.alert("Submit", 'Do you want to submit the data?', ui.ButtonSet.YES_NO);

  // Checking the user response and proceed with clearing the form if user selects Yes
  if (response == ui.Button.NO) {
    return;//exit from this function
  }

  //Validating the entry. If validation is true then proceed with transferring the data to Database sheet
  if (validateEntry() == true) {

    var blankRow = datasheet.getLastRow() + 1; //identify the next blank row

    datasheet.getRange(blankRow, 1).setValue(shUserForm.getRange("C7").getValue()); //Employee ID
    datasheet.getRange(blankRow, 2).setValue(shUserForm.getRange("C9").getValue()); //Employee Name
    datasheet.getRange(blankRow, 3).setValue(shUserForm.getRange("C11").getValue()); //Gender
    datasheet.getRange(blankRow, 4).setValue(shUserForm.getRange("C13").getValue()); // Email ID
    datasheet.getRange(blankRow, 5).setValue(shUserForm.getRange("C15").getValue()); //Department
    datasheet.getRange(blankRow, 6).setValue(shUserForm.getRange("C17").getValue());// Address

    // date function to update the current date and time as submittted on
    datasheet.getRange(blankRow, 7).setValue(new Date()).setNumberFormat('yyyy-mm-dd h:mm'); //Submitted On

    //get the email address of the person running the script and update as Submitted By
    datasheet.getRange(blankRow, 8).setValue(Session.getActiveUser().getEmail()); //Submitted By

    ui.alert(' "New Data Saved - Emp #' + shUserForm.getRange("C7").getValue() + ' "');

    //Clearnign the data from the Data Entry Form

    shUserForm.getRange("C7").clear();
    shUserForm.getRange("C9").clear();
    shUserForm.getRange("C11").clear();
    shUserForm.getRange("C13").clear();
    shUserForm.getRange("C15").clear();
    shUserForm.getRange("C17").clear();

  }
}


// ========================================================================================================================

//Function to Search the record

function searchRecord() {

  var myGooglSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 
  var shUserForm = myGooglSheet.getSheetByName("User Form"); //delcare a variable and set with the User Form worksheet
  var datasheet = myGooglSheet.getSheetByName("Database"); ////delcare a variable and set with the Database worksheet

  var str = shUserForm.getRange("C4").getValue();
  var values = datasheet.getDataRange().getValues(); //getting the entire values from the used range and assigning it to values variable
  var valuesFound = false; //variable to store boolean value

  for (var i = 0; i < values.length; i++) {
    var rowValue = values[i]; //declaraing a variable and storing the value

    //checking the first value of the record is equal to search item
    if (rowValue[0] == str) {

      shUserForm.getRange("C7").setValue(rowValue[0]);
      shUserForm.getRange("C9").setValue(rowValue[1]);
      shUserForm.getRange("C11").setValue(rowValue[2]);
      shUserForm.getRange("C13").setValue(rowValue[3]);
      shUserForm.getRange("C15").setValue(rowValue[4]);
      shUserForm.getRange("C17").setValue(rowValue[5]);
      return; //come out from the search function

    }
  }

  if (valuesFound == false) {
    //to create the instance of the user-interface environment to use the messagebox features
    var ui = SpreadsheetApp.getUi();
    ui.alert("No record found!");
  }

}


// ========================================================================================================================

//Function to edit the record

function editRecord() {

  var myGooglSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 
  var shUserForm = myGooglSheet.getSheetByName("User Form"); //delcare a variable and set with the User Form worksheet
  var datasheet = myGooglSheet.getSheetByName("Database"); ////delcare a variable and set with the Database worksheet

  //to create the instance of the user-interface environment to use the messagebox features
  var ui = SpreadsheetApp.getUi();

  // Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
  // close the dialog by clicking the close button in its title bar.
  var response = ui.alert("Submit", 'Do you want to edit the data?', ui.ButtonSet.YES_NO);

  // Checking the user response and proceed with clearing the form if user selects Yes
  if (response == ui.Button.NO) {
    return;//exit from this function
  }

  var str = shUserForm.getRange("C4").getValue();
  var values = datasheet.getDataRange().getValues(); //getting the entire values from the used range and assigning it to values variable

  var valuesFound = false; //variable to store boolean value to validate whether values found or not

  for (var i = 0; i < values.length; i++) {
    var rowValue = values[i]; //declaraing a variable and storing the value

    //checking the first value of the record is equal to search item
    if (rowValue[0] == str) {

      var iRow = i + 1; //identify the row number

      datasheet.getRange(iRow, 1).setValue(shUserForm.getRange("C7").getValue()); //Employee ID
      datasheet.getRange(iRow, 2).setValue(shUserForm.getRange("C9").getValue()); //Employee Name
      datasheet.getRange(iRow, 3).setValue(shUserForm.getRange("C11").getValue()); //Gender
      datasheet.getRange(iRow, 4).setValue(shUserForm.getRange("C13").getValue()); // Email ID
      datasheet.getRange(iRow, 5).setValue(shUserForm.getRange("C15").getValue()); //Department
      datasheet.getRange(iRow, 6).setValue(shUserForm.getRange("C17").getValue());// Address

      // date function to update the current date and time as submittted on
      datasheet.getRange(iRow, 7).setValue(new Date()).setNumberFormat('yyyy-mm-dd h:mm'); //Submitted On

      //get the email address of the person running the script and update as Submitted By
      datasheet.getRange(iRow, 8).setValue(Session.getActiveUser().getEmail()); //Submitted By

      ui.alert(' "Data updated for - Emp #' + shUserForm.getRange("C7").getValue() + ' "');

      //Clearnign the data from the Data Entry Form

      shUserForm.getRange("C4").clear();
      shUserForm.getRange("C7").clear();
      shUserForm.getRange("C9").clear();
      shUserForm.getRange("C11").clear();
      shUserForm.getRange("C13").clear();
      shUserForm.getRange("C15").clear();
      shUserForm.getRange("C17").clear();

      valuesFound = true;
      return; //come out from the search function
    }
  }

  if (valuesFound == false) {
    //to create the instance of the user-interface environment to use the messagebox features
    var ui = SpreadsheetApp.getUi();
    ui.alert("No record found!");
  }

}


// ========================================================================================================================

// Function to Clear the User Form

function clearForm() {
  var myGoogleSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 
  var shUserForm = myGoogleSheet.getSheetByName("User Form"); //declare a variable and set with the User Form worksheet

  //to create the instance of the user-interface environment to use the alert features
  var ui = SpreadsheetApp.getUi();

  // Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
  // close the dialog by clicking the close button in its title bar.
  var response = ui.alert("Reset Confirmation", 'Do you want to reset this form?', ui.ButtonSet.YES_NO);

  // Checking the user response and proceed with clearing the form if user selects Yes
  if (response == ui.Button.YES) {

    shUserForm.getRange("C4").clear(); //Search Field
    shUserForm.getRange("C7").clear();// Employeey ID
    shUserForm.getRange("C9").clear(); // Employee Name
    shUserForm.getRange("C11").clear(); // Gender
    shUserForm.getRange("C13").clear(); // Email ID
    shUserForm.getRange("C15").clear(); //Department
    shUserForm.getRange("C17").clear();//Address

    //Assigning white as default background color

    shUserForm.getRange("C4").setBackground('#FFFFFF');
    shUserForm.getRange("C7").setBackground('#FFFFFF');
    shUserForm.getRange("C9").setBackground('#FFFFFF');
    shUserForm.getRange("C11").setBackground('#FFFFFF');
    shUserForm.getRange("C13").setBackground('#FFFFFF');
    shUserForm.getRange("C15").setBackground('#FFFFFF');
    shUserForm.getRange("C17").setBackground('#FFFFFF');

    return true;

  }
}


// ========================================================================================================================

//Function to delete the record

function deleteRow() {

  var myGooglSheet = SpreadsheetApp.getActiveSpreadsheet(); //declare a variable and set with active google sheet 
  var shUserForm = myGooglSheet.getSheetByName("User Form"); //delcare a variable and set with the User Form worksheet
  var datasheet = myGooglSheet.getSheetByName("Database"); ////delcare a variable and set with the Database worksheet

  //to create the instance of the user-interface environment to use the messagebox features
  var ui = SpreadsheetApp.getUi();

  // Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
  // close the dialog by clicking the close button in its title bar.
  var response = ui.alert("Submit", 'Do you want to delete the record?', ui.ButtonSet.YES_NO);

  // Checking the user response and proceed with clearing the form if user selects Yes
  if (response == ui.Button.NO) {
    return;//exit from this function
  }

  var str = shUserForm.getRange("C4").getValue();
  var values = datasheet.getDataRange().getValues(); //getting the entire values from the used range and assigning it to values variable

  var valuesFound = false; //variable to store boolean value to validate whether values found or not

  for (var i = 0; i < values.length; i++) {
    var rowValue = values[i]; //declaraing a variable and storing the value

    //checking the first value of the record is equal to search item
    if (rowValue[0] == str) {

      var iRow = i + 1; //identify the row number
      datasheet.deleteRow(iRow); //deleting the row

      //message to confirm the action
      ui.alert(' "Record deleted for Emp #' + shUserForm.getRange("C4").getValue() + ' "');

      //Clearing the user form
      shUserForm.getRange("C4").clear();
      shUserForm.getRange("C7").clear();
      shUserForm.getRange("C9").clear();
      shUserForm.getRange("C11").clear();
      shUserForm.getRange("C13").clear();
      shUserForm.getRange("C15").clear();
      shUserForm.getRange("C17").clear();

      valuesFound = true;
      return; //come out from the search function
    }
  }

  if (valuesFound == false) {
    //to create the instance of the user-interface environment to use the messagebox features
    var ui = SpreadsheetApp.getUi();
    ui.alert("No record found!");
  }

}








