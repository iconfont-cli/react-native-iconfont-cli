#!/usr/bin/env node

import colors from 'colors'
import { getConfig } from '../libs/getConfig'
import { fetchXml } from 'iconfont-parser'
import { generateComponent } from '../libs/generateComponent'
import parseLocalSvg from '../libs/parseLocalSvg'

const config = getConfig()

const localSvg = parseLocalSvg(config)

fetchXml(config.symbol_url).then((result) => {
  generateComponent(result, localSvg, config)
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'))
  process.exit(1)
})
