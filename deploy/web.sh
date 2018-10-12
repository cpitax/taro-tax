
#  local deploy web
# sh ./deploy/web.sh

export TRAVIS_COMMIT_MSG="[deploy] $(git log --format='%h - %B' --no-merges -n 1)"
mkdir temp_web

git clone --depth 1 -b master --single-branch https://github.com/cpitax/cpitax.github.io.git temp_web

cp -rf dist/**  temp_web/

cd temp_web
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin master
cd ..
rm -rf temp_web/
