const tsConfigPaths = require("tsconfig-paths")

const baseUrl = "./" // Adjust this path if necessary
const { paths } = require("./tsconfig.json").compilerOptions

tsConfigPaths.register({
  baseUrl,
  paths,
})
