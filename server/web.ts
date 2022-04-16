function doGet() {
  let template = HtmlService.createTemplateFromFile("index");
  return template.evaluate();
}
function getAppScriptURL() {
  return ScriptApp.getService().getUrl();
}