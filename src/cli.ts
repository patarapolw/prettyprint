#!/usr/bin/env node

import { pp } from '.'

if (require.main === module) {
  const argv = process.argv.slice(2)
  const s = argv[argv.length - 1]
  if (s) {
    try {
      pp(JSON.parse(s))
    } catch (e) {
      // console.error(e)
      console.info('Please supply a valid JSON.')
    }
  }
}
