#!/usr/bin/env node
const fs = require('fs')
const torrentStream = require('torrent-stream')
const readTorrent = require('read-torrent')

const drive = require('./drive.js')
const dbFind = require('./db.js').dbFind
const db = require('./db.js').db

async function listTorrents () {
  dbFind({}, (items) => {
    items.forEach(item => {
      const line = [item.infoHash, item.name, item.category].filter(x => x).join('\t')
      console.log(line)
    })
  })
}

async function addTorrent (torrentFile, category) {
  console.log('Fetching torrent')
  readTorrent(torrentFile, function (err, torrent, raw) {
    if (err) {
      console.error(err.message)
      process.exit(2)
    }
    const ts = torrentStream(raw)
    ts.on('ready', async function () {
      const files = ts.files.map((file) => {
        return { path: file.path, length: file.length }
      })
      console.log('Files:')
      files.forEach(file => console.log(file))
      const metadata = JSON.stringify({ files: files })

      const doc = {
        torrentFile: ts.metadata.toString('base64'),
        name: ts.torrent.name,
        infoHash: torrent.infoHash,
        metadata: metadata,
        category: category
      }

      db.insert(doc, function (err, newDoc) {
        if (err) console.log(err)
        process.exit()
      })
    })
  })
}

let src = process.env.BTFS_SRC;
let dest = process.env.BTFS_DEST;
let tmp = '/tmp'
drive(src, dest, tmp)