#!/usr/bin/env node

import colors from 'colors'
import { getConfig } from '../libs/getConfig'
import { fetchXml, XmlData } from 'iconfont-parser'
import { generateComponent } from '../libs/generateComponent'
import parseLocalSvg from '../libs/parseLocalSvg'

const config = getConfig()

const localSvg = parseLocalSvg(config)

if (config.symbol_url) {
  fetchXml(config.symbol_url).then((result) => {
    generateComponent(result, localSvg, config)
  }).catch((e) => {
    console.error(colors.red(e.message || 'Unknown Error'))
    process.exit(1)
  })
} else {
  const result: XmlData = {
    svg: {
      symbol: []
    }
  };

  generateComponent(result, localSvg, config)
}
