let env = '' // 当前环境
let domain = '' // 当前域
const host = location.host

// 多环境枚举
const envs = [
  {
    // 本地环境
    reg: /localhost/,
    env: 'local',
    domain: 'api'
  }
]

const flag = envs.some(item => {
  if (item.reg.test(host)) {
    env = item.env
    domain = item.domain
    return true
  }
})

if (!flag) {
  env = 'pro'
  domain = envs[envs.length - 1].domain
}

// 判断是否是线上环境
const isLine = env !== 'local'

export { env, domain, isLine }
