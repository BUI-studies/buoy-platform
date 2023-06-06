import { GoogleSpreadsheet } from "google-spreadsheet"

export default class Sheets {
  constructor() {
    this.getDoc()
  }
  // SPREASHEET_ID
  // SPREADSHEET_TYPE
  // SPREADSHEET_PROJECT_ID
  // SPREADSHEET_PRIVATE_KEY_ID
  // SPREADSHEET_PRIVATE_KEY
  // SPREADSHEET_CLIENT_EMAIL
  // SPREADSHEET_CLIENT_ID
  // SPREADSHEET_AUTH_URI
  // SPREADSHEET_TOKEN_URI
  // SPREADSHEET_AUTH_PTOVIDER
  // SPREADSHEET_CLIENT_URL
  // SPREADSHEET_UNIVERSE_DOMAIN
  async getDoc() {
    const doc = new GoogleSpreadsheet(process.env.SPREASHEET_ID)

    await doc.useServiceAccountAuth({
      private_key: process.env.SPREADSHEET_PRIVATE_KEY || "",
      client_email: process.env.SPREADSHEET_CLIENT_EMAIL || "",
    })
    await doc.loadInfo(true)

    console.log(Object.keys(doc.sheetsByTitle))
  }
  // constructor() {
  //   // Create a new OAuth2 client with the loaded credentials
  //   const oauthClient = new OAuth2Client(
  //     process.env.SHEETS_CLIENT_ID,
  //     process.env.SHEETS_CLIENT_SECRET,
  //     "https://yamnyk.site"
  //   )

  //   oauthClient.on("tokens", (credentials) => {
  //     console.log("access_token ---->>", credentials.access_token)
  //     console.log("scope ---->>", credentials.scope)
  //     console.log("expiry_date ---->>", credentials.expiry_date)
  //     console.log("token_type ---->>", credentials.token_type) // will always be 'Bearer'
  //   })

  //   const authUrl = oauthClient.generateAuthUrl({
  //     access_type: "offline",
  //     scope: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  //   })

  //   console.log("Please visit the following URL to authorize the application:")
  //   console.log(authUrl)
  //   ;(async function () {
  //     const doc = new GoogleSpreadsheet(process.env.SPREASHEET_ID)
  //     await doc.useOAuth2Client(oauthClient)
  //     await doc.loadInfo()

  //     console.log(doc.sheetsByTitle)

  //     console.log(doc)
  //   })()
  // }
}
