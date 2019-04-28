const { run, createError } = require('micro')
const cors = require('micro-cors')()
const { parse } = require('url')
const getSubtitles = require('./subtitles')

const rIMDb = /^\/(tt\d{7})\/?$/
const handler = async ({ url }) => {
  const { pathname } = parse(url)
  const [, imdbid] = pathname.match(rIMDb) || []
  if (!imdbid) throw createError(400, 'Invalid IMDb id')
  return getSubtitles(imdbid)
}

module.exports = cors((req, res) => run(req, res, handler))