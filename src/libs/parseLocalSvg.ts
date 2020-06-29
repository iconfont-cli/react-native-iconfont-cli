import glob from 'glob'
import path from 'path'
import { Config } from '../libs/getConfig'
import * as fs from 'fs'

export interface ILocalSvg {
  svgStr: string
  name: string
}

const parseLocalSvg = ({ local_dir }: Config) => {
  if (!local_dir) {
    return []
  }

  const localDir = path.resolve(local_dir)

  const localSvg = glob.sync(path.join(localDir, '**/*.svg'))

  return localSvg.reduce<ILocalSvg[]>((previousValue, currentValue) => {

    let svgStr = fs.readFileSync(currentValue, 'utf-8')

    svgStr = svgStr.substring(svgStr.indexOf('<svg '), svgStr.indexOf('</svg>') + 6)
      .replace(/<!-(.*?)->/g, '')

    previousValue.push({ svgStr, name: path.basename(currentValue, '.svg') })

    return previousValue
  }, [])
}

export default parseLocalSvg
