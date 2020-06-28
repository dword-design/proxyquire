import { endent, mapValues } from '@dword-design/functions'
import outputFiles from 'output-files'
import P from 'path'
import withLocalTmpDir from 'with-local-tmp-dir'

const runTest = config => () =>
  withLocalTmpDir(async () => {
    await outputFiles({
      'bar.js': 'export default ${config.imported |> JSON.stringify}',
      'foo.js': endent`
        import bar from './bar'
        export default bar
      `,
      'test.js': endent`
        import self from '../src'

        export default self('./foo', {
          './bar': ${config.mock |> JSON.stringify}
        })
      `,
    })
    expect(require(P.resolve('test.js'))).toEqual(config.result)
  })

export default {
  valid: {
    imported: { test: 1 },
    mock: { test: 1 },
    result: { test: 1 },
  },
  'extra value': {
    imported: { test2: 2 },
    mock: { test: 1 },
    result: { test: 1 },
  },
} |> mapValues(runTest)
