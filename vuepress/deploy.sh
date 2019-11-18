
# 终止一个错误
set -e

# 构建
yarn build :build

# 进入生成的构建文件夹
cd blog/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:shenmissing/vuepress.github.io.git master


cd -