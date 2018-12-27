#node核心模块-fs
**1、文件读取**

 - fs.readFile
`fs.readFile(filename,[encoding],[callback(error,data)]`是最简    单的文件读取函数，它接受一个必选参数filename，表示读取的文件名。
第二个参数encoding是可选的，表示文件字符编码。callback是回调函数，用于接收文件的内容。如果不指定encoding，则callback就是第二个参数。
回调函数提供两个参数err和data，err表示有没有错误发生，data是文件内容。
如果指定encoding，data是一个解析后的字符串，否则将会以Buffer形式表示的二进制数据。

  ```
    const fs = require('fs');
    fs.readFile('./file/readFile.txt','utf8', function(err, data) {
        if (err) {
            throw err;
        }
        // 读取文件成功
        console.log('异步测试： -->'+data);
    });
    //同步
    var data=fs.readFileSync('./file/readFile.txt','utf-8');
    console.log('同步测试：-->'+data);
  ```
  
 - fs.writeFile
    `fs.writeFile(filename,data,[options],callback)`用来写文件，其中options为对象，有以下几个值：
  ```
  encoding {String | null} default='utf-8'
    mode {Number} default=438(aka 0666 in Octal)
    flag {String} default='w'
  ```
  这里主要flag值，默认为w,会清空文件，然后再写。flag值，`r代表读取文件`，`w代表写文件`，`a代表追加`。
  
  
  
  ```
  const fs = require('fs');
// 写入文件内容（如果文件不存在会创建一个文件）
// 写入时会先清空文件
fs.writeFile('./file/writeFile.txt', '写入成功：hello world', function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    var data=fs.readFileSync('./file/writeFile.txt', 'utf-8');
    console.log('new data -->'+data);
});
  ```
  
 - fs.writeFile
  `fs.appendFile(filename, data, [options], callback)`该方法以异步的方式将 data 插入到文件里，如果文件不存在会自动创建。data可以是任意字符串或者缓存。
与fs.writeFile 方法差别就是 [options]的flag默认值是”a”，所以它以追加方式写入数据.

```
const fs = require('fs');
// 写入文件内容（如果文件不存在会创建一个文件）
fs.appendFile('./file/appendFile.txt', '新数据456', function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    var data=fs.readFileSync('./file/appendFile.txt', 'utf-8');
    console.log(data);
});
```

   - 删除文件 unlink
   
```
const fs =require('fs');
fs.unlink('./file/unlink.txt',function(err){
	if(err) return;
	console.log('成功删除了unlink.txt这个文件');
});
```

**2、文件读取-指定位置读写**

这个跟上面的过程相比，流程稍微麻烦一点点，要先用fs.open来打开文件，然后才可以用fs.read去读，或者用fs.write去写文件，最后，你需要用fs.close去关掉文件。

- fs.open

    用法：fs.open(path,flags,[mode],callback)
    `path` 文件路径
    `flags`打开文件的方式
    
    lags部分值为(没全部列出，需要的话去查即可)：

    `r`:以读取模式打开文件
    
    `r+`：以读写模式
    
    `w`：以写入模式打开，如果不存在则创建
    
    `w+`：以读写模式打开，如果不存在则创建
    
    `a`:以追加模式打开文件，如果不存在则创建
    
    `a+`:以读取追加模式打开文件，如果文件不存在则创建。
    
    [mode] 是文件的权限（可选参数，默认值是0666）
    callback 回调函数

```
const fs = require('fs');
fs.open('./file/open.txt','r','0666',function(err,fd){
   console.log(fd); //返回的第二个参数为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
})
```

- fs.read
    用法fs.read(fd, buffer, offset, length, position, callback);
`fd`, 使用fs.open打开成功后返回的文件描述符
`buffer`, 一个Buffer对象，v8引擎分配的一段内存
`offset`, 整数，向缓存区中写入时的初始位置，以字节为单位
`length`, 整数，读取文件的长度
`position`, 整数，读取文件初始位置；文件大小以字节为单位
`callback(err, bytesRead, buffer)`, 读取执行完成后回调函数，bytesRead:实际读取字节数，buffer:被读取的缓存区对象

```
fs.open('./file/open.txt', 'r', function (err, fd) {
  if(err) {
    return;

  } else {

    var buffer = new Buffer(255);
    //每一个汉字utf8编码是3个字节，英文是1个字节
    fs.read(fd, buffer, 0, 9, 0, function (err, bytesRead, buffer) {
      if(err) {
        throw err;
      } else {
        console.log(bytesRead);
        console.log(buffer.slice(0, bytesRead).toString());  
        //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
        fs.read(fd, buffer, 0, 20, null, function (err, bytesRead, buffer) {
          console.log(bytesRead);
          console.log(buffer.slice(0, bytesRead).toString());
        });
      }
    });
  }
});
```

- fs.write
用法fs.write(fd, buffer, offset, length, position, callback);
`fd`, 使用fs.open打开成功后返回的文件描述符
`buffer`, 一个Buffer对象，v8引擎分配的一段内存
`offset`, 整数，从缓存区中读取时的初始位置，以字节为单位
`length`, 整数，从缓存区中读取数据的字节数
`position`, 整数，写入文件初始位置；
`callback(err, written, buffer)`, 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象

```
const fs = require('fs');

fs.open(__dirname + '/file/open.txt', 'a', function (err, fd) {
  if(err) {
    console.error(err);
    return;
  } else {
    var buffer = new Buffer('写入文件数据内容');
    //写入'入文件'三个字
    fs.write(fd, buffer, 3, 9, 12, function (err, written, buffer) {
      if(err) {
        console.log('写入文件失败');
        console.error(err);
        return;
      } else {
        console.log(buffer.toString());
        //写入'数据内'三个字
        fs.write(fd, buffer, 12, 9, null, function (err, written, buffer) {
          console.log(buffer.toString());
        })
      }
    });
  }
});
```

- fs.close

    用法fs.close(fd,callback)
    fd 文件open时传递的文件描述符
    callback 回调函数
    
    
**3、目录操作**

- fs.mkdir创建目录

```
const fs = require('fs');
fs.mkdir('./mkdir',function(err){
  if(err) return;
  console.log('创建目录成功');
})
```

- fs.rmdir删除目录

```
const fs = require('fs');
fs.rmdir('./mkdir',function(err){
  if(err) return;
  console.log('删除目录成功');
})
```

- fs.readdir读取目录
返回的data为一个数组，包含该文件夹的所有文件
```
const fs = require('fs');
fs.readdir('./file',function(err,data){
  if(err) return;
  //data为一个数组
  console.log('读取的数据为：'+data[0]);
});
```

**4、链接文件操作**

- fs.link 创建一个链接 
fs.link(srcpath, dstpath, [callback(err)])
`srcpath`为源文件目录或文件的路径
`dstpath`为转换后的路径
可以理解为复制了一份文件到另一个文件，比如下面的demo8,我们在file文件有一个link.txt，执行后，file文件里面生成了linkFile文件，而且两者的内容是一样的,或者说是源文件的备份
进一步理解
`fs.link(srcpath, dstpath, [callback])`和 `fs.symlink(linkdata, path, [callback])`
建立文件链接，除非回调函数执行过程出现了异常，否则不会传递任何参数。link和symlink的区别是： link 创建的是hard link 所谓硬链接; symlink创建的是symbolic link 所谓符号链接 硬链接就是备份，软连接就是快捷方式

```
const fs = require('fs');
fs.link('./file/link.txt','./file/linkFile.txt',function(err){
   if(err) return;
})
```

- fs.readlink、fs.realpath、fs.unlink
`fs.readlink(path, [callback])` 读取链接源地址,注意：读取的是软连接中的实际中文名，也就是symlink设置的软连接
`fs.realpath(path, [callback])` 获取当前目录或者文件的绝对路径
`fs.unlink(path, [callback])` 删除某一个文件链接(删除的是硬链接)

```
const fs = require('fs');
// readlink
fs.readlink('./file/link2.txt',function(err,data){
   console.log(data); //.\file\link.txt  返回创建它的软链接,这里，link2是由link创建的软链接
});

// realpath
fs.realpath('./file/linkFile.txt', function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
  //F:\myFile\express\express-study\fs\fsTest\file\linkFile.txt  返回绝对路径
});

```

**5、watchfile()，unwatchfile()**

watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数

```
var fs = require('fs');

fs.watchFile('./testFile.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./testFile.txt', "changed", function (err) {
  if (err) throw err;

  console.log("file write complete");   
});
```

unwatchfile方法用于解除对文件的监听。