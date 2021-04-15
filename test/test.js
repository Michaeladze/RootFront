const { basename, join } = require('path')
const fs = require('fs/promises')
const copyFile = (options = {}) => {
  const { targets = [], hook = 'buildEnd' } = options
  return {
    name: 'copy-file',
    [hook]: () => {
      console.log('11111',targets)
      targets.forEach(async target => {

        console.log('2222',target)
        await fs.mkdir(target.dest, { recursive: true })

        const destPath = join(target.dest, basename(target.src))
        await fs.copyFile(target.src, destPath)
      })
    }
  }
}
export default copyFile
