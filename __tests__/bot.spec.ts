import { createServer } from 'node:http'
import { WebSocket, WebSocketServer } from 'ws'
import { faker } from '@faker-js/faker'
import { Bot } from '../src/bot'
import { randomBotToken, randomUserToken } from './utils'

const USER_TOKEN = randomUserToken()
const WS_PORT = 32595
const WS_URL = `ws://localhost:${WS_PORT}/websocket`

const bot = new Bot(randomBotToken())
const wsHttpServer = createServer()
const wsServer = new WebSocketServer({ port: WS_PORT, noServer: true })

describe('机器人事件订阅', () => {
  it('连接', () => {
    return new Promise<void>((resolve, reject) => {
      wsHttpServer.on('upgrade', (req) => {
        expect(req.url).not.toBeUndefined()
        const url = new URL(req.url!)
        faker.string.hexadecimal()
        const params = Array.from(url.searchParams.entries())
        expect(params).toContain(['id', USER_TOKEN])
        expect(params).toContain(['dId', '114514114514114514'])
        expect(params).toContain(['v', '1.6.60'])
        expect(params).toContain(['x-super-properties', '{"platform":"bot","version":"1.6.60","channel":"office","device_id":"114514114514114514","build_number":"1"}'])
        resolve()
      })
      wsServer.on('error', reject)
      bot.listen({ url: WS_URL }).then(bus => bus.emit('close'))
    }).then(() => wsHttpServer.removeAllListeners())
  })
})
