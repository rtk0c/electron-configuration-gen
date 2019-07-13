const path = require('path');
const exec = require('child_process').exec;

const HtmlWebpackPlugin = require('html-webpack-plugin');

function execute(commands) {
  exec(commands.join(';'), (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  });
}

const REPO_URL = 'https://github.com/rtk0c/electron-configuration-gen.git';

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/periodic_table.html',
        inject: 'body',
        title: 'Electron Configuration on Periodic Table',
        filename: 'index.html'
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            if (!env) {
              process.stdout.write('echo "Environment was not specified. Add --env.commit to commit"');
              return;
            }

            if (env.commit) {
              execute([`bash ./build.sh "${REPO_URL}" "${new Date().toString()}"`]);
            }
          });
        }
      }
    ]
  };
};