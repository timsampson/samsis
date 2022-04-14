function onOpen() {
    const ss = SpreadsheetApp.getActiveSpreadsheet(),
        options = [{ name: "Show Alert", functionName: "showAlert" }];
    ss.addMenu("Notification", options);
}
function showAlert() {
    let ui = SpreadsheetApp.getUi();
    let result = ui.alert(
        "Are you sure you want an alert?",
        ui.ButtonSet.YES_NO
    );
    // Process the user's response.
    if (result === ui.Button.YES) {
        // User clicked "Yes".
        ui.alert(
            "Have a nice day.",
            ui.ButtonSet.OK
        );
    } else {
        // User clicked "No" or X in the title bar.
        ui.alert("Operation Cancelled.");
    }
}
