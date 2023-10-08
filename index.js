#!/usr/bin/env node
import drive from './drive.js'

let src = process.env.BTFS_SRC;
let dest = process.env.BTFS_DEST;
let tmp = '/tmp'
drive(src, dest, tmp)