const packager = require("electron-packager")

async function bundleElectronApp(options) {
  const appPaths = await packager({
    dir: ".",
    overwrite: true,
    out: "packages",
    ignore: [
      /node_modules/,
      /src/,
      /.git/,
      /package.js$/,
      /package-lock.json/,
      /rollup.config.js/,
      /tsconfig.json/,
    ],
    ...options
  })
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`)
}

bundleElectronApp({
  platform: getArg("platform", undefined),
  arch: getArg("arch", undefined)
})
  .then(() => console.log("done"))
  .catch(console.error)

/**
 * @param {string} name
 * @param {string | undefined} fallback
 * @return {string | undefined}
 */
function getArg(name, fallback) {
  const prefix = `--${name}=`
  const arg = process.argv.find(arg => arg.startsWith(prefix))
  if (arg !== undefined) {
    const value = arg.substr(prefix.length)
    if (value !== "") {
      return value
    } else {
      return fallback
    }
  } else {
    return fallback
  }
}