#!/usr/bin/env node

/*
 * @Author: liyb
 * @Email: liyanbin05@cnpc.com.cn
 * @Date: 2022-06-11 01:28:39
 * @LastEditTime: 2022-06-11 02:28:14
 * @LastEditors: your name
 * @Description: 拷贝文件夹或者文件
 * 参数说明：
 * -s 源目录
 * -d 目标目录
 * -f 是否覆盖文件
 * -r 是否递归
 * -c 是否拷贝当前目录
 */
'use strict'
const fs = require('fs')
const path = require('path')
const yargs = require('yargs-parser')

const args = yargs(process.argv.slice(2))
if (args.s && args.d) {
  var options = {}
  args.f && (options.f = true)
  args.r && (options.r = true)
  copyRecursiveSync(args.s, args.d, options)
} else {
  console.error('😩😩😩😩', 'missing source or destination')
}

/**
 * copy file or folder
 * @param {*} src
 * @param {*} dest
 * @param {*} options
 */
function copyRecursiveSync(src, dest, options) {
  options = Object.assign(
    {
      f: false,
      r: false,
    },
    options
  )
  var exists = fs.existsSync(src)
  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    var destExists = fs.existsSync(dest)
    if (destExists) {
        var destStats = fs.statSync(dest)
        var destIsDirectory = destStats.isDirectory()
        if(destIsDirectory) {
            removeDir(dest)
        }else{
            fs.rmSync(dest)
        }
    }
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      if (options.r) {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName),
          options
        )
      }
    })
  } else {
    if (options.f) {
        console.log('🤦‍🤦‍🤦‍')
      fs.copyFileSync(src, dest)
    }
  }
}

function removeDir(dir) {
    let files = fs.readdirSync(dir)
    for(var i=0;i<files.length;i++){
      let newPath = path.join(dir,files[i]);
      let stat = fs.statSync(newPath)
      if(stat.isDirectory()){
        //如果是文件夹就递归下去
        removeDir(newPath);
      }else {
       //删除文件
        fs.unlinkSync(newPath);
      }
    }
    fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
  }

