import { createRequire } from "module"
import release from "release-it"
import semver from "semver"

const require = createRequire(import.meta.url)
const { version: currentVersion } = require("./package.json")
const expectVersion = process.argv[2]

async function main() {
  if (!semver.gt(expectVersion, currentVersion)) {
    console.log(`Already up-to-date with latest version of 'expect' (${expectVersion}).`)
    process.exit(0)
  }

  console.log(`Found newer version of 'expect' (${expectVersion}). Publishing update...`)
  const { name, version } = await release({
    git: {
      requireCleanWorkingDir: false
    },
    increment: expectVersion
  })
  console.log(`Released ${name}@${version}`)
}

main()
