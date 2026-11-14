// Google Apps Script para recibir datos del Mar de Ideas y guardarlos en la hoja
// Instrucciones:
// 1. Abre la hoja: https://docs.google.com/spreadsheets/d/1Ns4INF7_Nyn4U4oKgIPQWCwFvxQrcemJb-Bf6Mw7k4A/edit
// 2. Extensiones > Apps Script
// 3. Pega este código y guarda
// 4. Despliega > Nueva implementación > Tipo: Aplicación web
//    - Ejecutar como: Yo
//    - Quién tiene acceso: Cualquiera
// 5. Copia la URL del Web App y pégala en la constante SHEET_WEBHOOK del index.html

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Aportaciones") || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.appendRow([
      data.fecha || new Date(),
      data.titulo || "",
      data.etiquetas || "",
      data.nombre || "",
      data.institucion || "",
      data.interes || "",
      data.contacto || "",
      data.id || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Mar de Ideas webhook activo");
}
