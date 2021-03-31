import Proxyquire from 'proxyquire/lib/proxyquire'

delete require.cache[require.resolve(__filename)]

const proxyquire = new Proxyquire(module.parent)
proxyquire.noCallThru()

export default proxyquire
