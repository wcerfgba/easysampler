#!/bin/bash
cat > preact.config.js <<EOF
export default function (config, env, helpers) {
	config.output.publicPath = '/easysampler/';
  config.module.loaders[0].options.name = (filename) => {
    let relative = filename.replace(src, config.output.publicPath);
    let isRoute = filename.indexOf('/routes/') >= 0;

    return isRoute ? 'route-' + relative.replace(/(^\/(routes|components\/(routes|async))\/|(\/index)?\.js$)/g, '') : false;
  };
}
EOF
yarn install                                        &&
yarn build                                          &&
mv build .build                                     &&
git checkout gh-pages                               &&
rm -rf *                                            &&
mv .build/* .                                       &&
rm -r .build                                        &&
git add .                                           &&
git commit -m `date -Ins`                           &&
git checkout master