import util from 'util'

export function pp (obj: any, options: util.InspectOptions = {}) {
  console.log(util.inspect(cloneAndReplace(obj), {
    colors: true,
    depth: null,
    ...options
  }))
}

class MultilineString {
  // eslint-disable-next-line no-useless-constructor
  constructor (public s: string) {}

  [util.inspect.custom] (depth: number, options: util.InspectOptionsStylized) {
    return [
      '',
      ...this.s.split('\n').map((line) => {
        return '\x1b[2m|\x1b[0m ' + options.stylize(line, 'string')
      })
    ].join('\n')
  }
}

function cloneAndReplace (obj: any) {
  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj) && obj.constructor === Array) {
      const o = [] as any[]
      obj.map((el, i) => {
        o[i] = cloneAndReplace(el)
      })
      return o
    } else if (obj.constructor === Object) {
      const o = {} as any
      Object.entries(obj).map(([k, v]) => {
        o[k] = cloneAndReplace(v)
      })
      return o
    }
  } else if (typeof obj === 'string') {
    if (obj.includes('\n')) {
      return new MultilineString(obj)
    }
  }

  return obj
}
