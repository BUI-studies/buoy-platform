import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"

import { TableCell, Tables } from "@/utils"
import { Populated } from "@/types"

export default class Sheets {
  static doc: GoogleSpreadsheet | null = null
  static tables: Tables | null = null
  static tablesTitles: string[] | null = null

  static init() {
    Sheets.getDoc()
  }

  static async getDoc() {
    const doc = new GoogleSpreadsheet(process.env.SPREASHEET_ID)

    await doc.useServiceAccountAuth({
      private_key:
        Buffer.from(process.env.SPREADSHEET_PRIVATE_KEY || "").toString(
          "base64"
        ) || "",
      client_email: process.env.SPREADSHEET_CLIENT_EMAIL || "",
    })
    await doc.loadInfo(true)

    Sheets.doc = doc || null
    Sheets.tablesTitles = Object.keys(doc?.sheetsByTitle) || null
    Sheets.tables = doc?.sheetsByTitle || null
  }

  static parseRows(
    rows: GoogleSpreadsheetRow[],
    rowToObjectMapper: (row: TableCell[], ind: number) => Populated
  ) {
    return rows
      .map((r, index) =>
        rowToObjectMapper(
          r.map(({ _row, _column, _rawData }: TableCell) => ({
            row: _row,
            col: _column,
            _rawData,
          })),
          index
        )
      )
      .filter((v) => Object.keys(JSON.parse(JSON.stringify(v))).length > 0)
  }

  static getCellValueFromRawData(cell: TableCell) {
    return (
      cell._rawData?.effectiveValue?.stringValue ||
      cell._rawData?.effectiveValue?.numberValue ||
      cell._rawData?.effectiveValue?.boolValue
    )
  }
}
