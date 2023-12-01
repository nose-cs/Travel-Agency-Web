export enum ExportType {
  PDF,
  EXCEL
}
export class Document {
  contentBase64: string = '';
  contentType: string = '';
  name: string = '';
}
