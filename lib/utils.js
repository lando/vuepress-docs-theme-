'use strict';
const _ = require('lodash');
const {isLinkHttp} = require('@vuepress/shared');
const {path} = require('@vuepress/utils');

exports.canGenerateContribPage = ({contributorPage, repo}) => {
  // If we dont have a repo then its not going to work
  if (!repo) return false;
  // Only works for internal paths
  if (isLinkHttp(contributorPage)) return false;
  // Only works for GitHub repos for now
  if (!isLinkHttp(repo) || /github\.com/.test(repo)) return true;
  // Or false
  return false;
};

exports.getTopLevelPages = items => _(items)
  .map(item => (_.isString(item)) ? item : item.link)
  .compact()
  .map(item => path.basename(item, '.md'))
  .map(item => path.basename(item, '.html'))
  .value();