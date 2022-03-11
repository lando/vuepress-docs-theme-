const {path} = require('@vuepress/utils');
const robotstxt = require('generate-robotstxt');
const fs = require('fs');

const name = '@lando/plugin-robots';
const debug = require('debug')(name);

module.exports = (options, app) => {
  const {
    allowAll = false,
    disallowAll = false,
    host,
    sitemap,
    policies,
    outputFile = 'robots.txt',
  } = options;

  return {
    name,
    onGenerated: () => {
      if (!app.env.isBuild) {
        debug('robots.txt will only generate in production build');
        return {};
      }

      debug('generating robots.txt ...');

      const robotsTxt = path.resolve(
        app.options.dest, outputFile,
      );

      // Get all policies togeter; If none provided, it will allow all except path: /admin
      let policyArray = [];

      const disallowAllPolicy = {
        userAgent: '*',
        disallow: '/',
      };
      const allowAllPolicy = {
        userAgent: '*',
        disallow: '',
      };

      if (disallowAll) {
        policyArray.push(disallowAllPolicy);
      } else {
        if (allowAll) {
          policyArray.push(allowAllPolicy);
        } else {
          // allowAll and disallowAll not provided, then use policies
          if (typeof policies !== 'undefined' && policies.length > 0) {
            policies.forEach(policy => {
              policyArray.push(policy);
            });
          } else {
            policyArray.push(allowAllPolicy);
          }
        }
      }

      // Build our data
      const data = {policy: policyArray};
      if (host) data.host = host;
      if (sitemap) data.sitemap = sitemap;

      robotstxt({
        policy: policyArray,
        host,
        sitemap,
      }).then(content => {
        fs.writeFileSync(robotsTxt, content);
        debug('wrote robots.txt to %s with content %0', robotsTxt, content);
        return content;
      }).catch(error => {
        throw error;
      });
    },
  };
};
