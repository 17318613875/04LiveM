//  deploy/index.js里面
const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const server = {
  id: 0,
  name: 'A-测试环境',
  host: '10.200.12.119', // ip
  port: 22, // 端口
  username: 'root', // 登录服务器的账号
  password: 'MGTV@2019', // 登录服务器的账号
  path: '/root/web/dist'// 发布至静态服务器的项目路径
}
const spinner = ora(
  '正在发布到测试服务器...'
)

var Client = require('ssh2').Client

var conn = new Client()
conn
  .on('ready', function () {
    // rm 删除dist文件，\n 是换行 换行执行 重启nginx命令 我这里是用docker重启nginx
    conn.exec('rm -rf /root/web/dist', function (
      err,
      stream
    ) {
      if (err) throw err
      stream
        .on('close', function (code, signal) {
          // 在执行shell命令后，把开始上传部署项目代码放到这里面
          spinner.start()
          scpClient.scp(
            './dist',
            {
              host: server.host,
              port: server.port,
              username: server.username,
              password: server.password,
              path: server.path
            },
            function (err) {
              spinner.stop()
              if (err) {
                console.log(chalk.red('发布失败.\n'))
                throw err
              } else {
                console.log(
                  chalk.green(
                    'Success! 成功发布到测试服务器! \n'
                  )
                )
              }
            }
          )

          conn.end()
        })
        .on('data', function (data) {
          console.log('STDOUT: ' + data)
        })
        .stderr.on('data', function (data) {
          console.log('STDERR: ' + data)
        })
    })
  })
  .connect({
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password
    // privateKey: require('fs').readFileSync('/home/admin/.ssh/id_dsa')
  })
