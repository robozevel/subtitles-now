const { createError } = require('micro')
const fetch = require('node-fetch')
const OS = require('opensubtitles-api')
const { parse } = require('subtitle')
const { useragent } = process.env

const OpenSubtitles = new OS({ useragent, ssl: true })

const removeAds = ({ text }) => !text.includes('OpenSubtitles')

module.exports = async (imdbid, sublanguageid = 'eng') => {
  const { en } = await OpenSubtitles.search({ imdbid, sublanguageid })
  if (!en) throw createError(404)
  const res = await fetch(en.url)
  const text = await res.text()
  return parse(text).filter(removeAds)
}