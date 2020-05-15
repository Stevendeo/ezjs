// Generated by js_of_ocaml 3.4.0
(function(joo_global_object)
   {"use strict";
    function raw_array_sub(a,i,l)
     {var b=new Array(l);for(var j=0;j < l;j++)b[j] = a[i + j];return b}
    function caml_subarray_to_string(a,i,len)
     {var f=String.fromCharCode;
      if(i == 0 && len <= 4096 && len == a.length)return f.apply(null,a);
      var s="";
      for(;0 < len;i += 1024,len -= 1024)
       s += f.apply(null,raw_array_sub(a,i,Math.min(len,1024)));
      return s}
    function caml_convert_string_to_array(s)
     {if(joo_global_object.Uint8Array)
       var a=new (joo_global_object.Uint8Array)(s.l);
      else
       var a=new Array(s.l);
      var b=s.c,l=b.length,i=0;
      for(;i < l;i++)a[i] = b.charCodeAt(i);
      for(l = s.l;i < l;i++)a[i] = 0;
      s.c = a;
      s.t = 4;
      return a}
    function caml_blit_bytes(s1,i1,s2,i2,len)
     {if(len == 0)return 0;
      if(i2 == 0 && (len >= s2.l || s2.t == 2 && len >= s2.c.length))
       {s2.c
        =
        s1.t == 4
         ?caml_subarray_to_string(s1.c,i1,len)
         :i1 == 0 && s1.c.length == len?s1.c:s1.c.substr(i1,len);
        s2.t = s2.c.length == s2.l?0:2}
      else
       if(s2.t == 2 && i2 == s2.c.length)
        {s2.c
         +=
         s1.t == 4
          ?caml_subarray_to_string(s1.c,i1,len)
          :i1 == 0 && s1.c.length == len?s1.c:s1.c.substr(i1,len);
         s2.t = s2.c.length == s2.l?0:2}
       else
        {if(s2.t != 4)caml_convert_string_to_array(s2);
         var c1=s1.c,c2=s2.c;
         if(s1.t == 4)
          if(i2 <= i1)
           for(var i=0;i < len;i++)c2[i2 + i] = c1[i1 + i];
          else
           for(var i=len - 1;i >= 0;i--)c2[i2 + i] = c1[i1 + i];
         else
          {var l=Math.min(len,c1.length - i1);
           for(var i=0;i < l;i++)c2[i2 + i] = c1.charCodeAt(i1 + i);
           for(;i < len;i++)c2[i2 + i] = 0}}
      return 0}
    function caml_blit_string(s1,i1,s2,i2,len)
     {return caml_blit_bytes(s1,i1,s2,i2,len)}
    function raw_array_append_one(a,x)
     {var l=a.length,b=new Array(l + 1),i=0;
      for(;i < l;i++)b[i] = a[i];
      b[i] = x;
      return b}
    function caml_call_gen(f,args)
     {if(f.fun)return caml_call_gen(f.fun,args);
      var n=f.length,argsLen=args.length,d=n - argsLen;
      if(d == 0)
       return f.apply(null,args);
      else
       if(d < 0)
        return caml_call_gen
                (f.apply(null,raw_array_sub(args,0,n)),
                 raw_array_sub(args,n,argsLen - n));
       else
        return function(x)
         {return caml_call_gen(f,raw_array_append_one(args,x))}}
    function caml_str_repeat(n,s)
     {if(s.repeat)return s.repeat(n);
      var r="",l=0;
      if(n == 0)return r;
      for(;;)
       {if(n & 1)r += s;
        n >>= 1;
        if(n == 0)return r;
        s += s;
        l++;
        if(l == 9)s.slice(0,1)}}
    function caml_convert_string_to_bytes(s)
     {if(s.t == 2)
       s.c += caml_str_repeat(s.l - s.c.length,"\0");
      else
       s.c = caml_subarray_to_string(s.c,0,s.c.length);
      s.t = 0}
    function caml_is_ascii(s)
     {if(s.length < 24)
       {for(var i=0;i < s.length;i++)if(s.charCodeAt(i) > 127)return false;
        return true}
      else
       return ! /[^\x00-\x7f]/.test(s)}
    function caml_utf16_of_utf8(s)
     {for(var b="",t="",c,c1,c2,v,i=0,l=s.length;i < l;i++)
       {c1 = s.charCodeAt(i);
        if(c1 < 0x80)
         {for(var j=i + 1;j < l && (c1 = s.charCodeAt(j)) < 0x80;j++);
          if(j - i > 512)
           {t.substr(0,1);b += t;t = "";b += s.slice(i,j)}
          else
           t += s.slice(i,j);
          if(j == l)break;
          i = j}
        v = 1;
        if(++i < l && ((c2 = s.charCodeAt(i)) & - 64) == 128)
         {c = c2 + (c1 << 6);
          if(c1 < 0xe0)
           {v = c - 0x3080;if(v < 0x80)v = 1}
          else
           {v = 2;
            if(++i < l && ((c2 = s.charCodeAt(i)) & - 64) == 128)
             {c = c2 + (c << 6);
              if(c1 < 0xf0)
               {v = c - 0xe2080;
                if(v < 0x800 || v >= 0xd7ff && v < 0xe000)v = 2}
              else
               {v = 3;
                if
                 (++i
                  <
                  l
                  &&
                  ((c2 = s.charCodeAt(i)) & - 64)
                  ==
                  128
                  &&
                  c1
                  <
                  0xf5)
                 {v = c2 - 0x3c82080 + (c << 6);
                  if(v < 0x10000 || v > 0x10ffff)v = 3}}}}}
        if(v < 4)
         {i -= v;t += "\ufffd"}
        else
         if(v > 0xffff)
          t += String.fromCharCode(0xd7c0 + (v >> 10),0xdc00 + (v & 0x3FF));
         else
          t += String.fromCharCode(v);
        if(t.length > 1024){t.substr(0,1);b += t;t = ""}}
      return b + t}
    function caml_to_js_string(s)
     {switch(s.t)
       {case 9:return s.c;
        default:caml_convert_string_to_bytes(s);case 0:
         if(caml_is_ascii(s.c)){s.t = 9;return s.c}s.t = 8;
        case 8:return caml_utf16_of_utf8(s.c)
        }}
    function MlBytes(tag,contents,length)
     {this.t = tag;this.c = contents;this.l = length}
    MlBytes.prototype.toString = function(){return caml_to_js_string(this)};
    MlBytes.prototype.slice
    =
    function()
     {var content=this.t == 4?this.c.slice():this.c;
      return new MlBytes(this.t,content,this.l)};
    function caml_raise_with_arg(tag,arg){throw [0,tag,arg]}
    function caml_new_string(s){return new MlBytes(0,s,s.length)}
    function caml_raise_with_string(tag,msg)
     {caml_raise_with_arg(tag,caml_new_string(msg))}
    var caml_global_data=[0];
    function caml_invalid_argument(msg)
     {caml_raise_with_string(caml_global_data.Invalid_argument,msg)}
    function caml_create_bytes(len)
     {if(len < 0)caml_invalid_argument("Bytes.create");
      return new MlBytes(len?2:9,"",len)}
    var caml_oo_last_id=0;
    function caml_fresh_oo_id(){return caml_oo_last_id++}
    function caml_js_get_console()
     {var
       c=joo_global_object.console?joo_global_object.console:{},
       m=
        ["log",
         "debug",
         "info",
         "warn",
         "error",
         "assert",
         "dir",
         "dirxml",
         "trace",
         "group",
         "groupCollapsed",
         "groupEnd",
         "time",
         "timeEnd"];
      function f(){}
      for(var i=0;i < m.length;i++)if(! c[m[i]])c[m[i]] = f;
      return c}
    function caml_utf8_of_utf16(s)
     {for(var b="",t=b,c,d,i=0,l=s.length;i < l;i++)
       {c = s.charCodeAt(i);
        if(c < 0x80)
         {for(var j=i + 1;j < l && (c = s.charCodeAt(j)) < 0x80;j++);
          if(j - i > 512)
           {t.substr(0,1);b += t;t = "";b += s.slice(i,j)}
          else
           t += s.slice(i,j);
          if(j == l)break;
          i = j}
        if(c < 0x800)
         {t += String.fromCharCode(0xc0 | c >> 6);
          t += String.fromCharCode(0x80 | c & 0x3f)}
        else
         if(c < 0xd800 || c >= 0xdfff)
          t
          +=
          String.fromCharCode
           (0xe0 | c >> 12,0x80 | c >> 6 & 0x3f,0x80 | c & 0x3f);
         else
          if
           (c
            >=
            0xdbff
            ||
            i
            +
            1
            ==
            l
            ||
            (d = s.charCodeAt(i + 1))
            <
            0xdc00
            ||
            d
            >
            0xdfff)
           t += "\xef\xbf\xbd";
          else
           {i++;
            c = (c << 10) + d - 0x35fdc00;
            t
            +=
            String.fromCharCode
             (0xf0 | c >> 18,
              0x80 | c >> 12 & 0x3f,
              0x80 | c >> 6 & 0x3f,
              0x80 | c & 0x3f)}
        if(t.length > 1024){t.substr(0,1);b += t;t = ""}}
      return b + t}
    function caml_js_to_string(s)
     {var tag=9;
      if(! caml_is_ascii(s))tag = 8,s = caml_utf8_of_utf16(s);
      return new MlBytes(tag,s,s.length)}
    function caml_raise_sys_error(msg)
     {caml_raise_with_string(caml_global_data.Sys_error,msg)}
    var caml_ml_channels=new Array();
    function caml_ml_flush(chanid)
     {var chan=caml_ml_channels[chanid];
      if(! chan.opened)caml_raise_sys_error("Cannot flush a closed channel");
      if(! chan.buffer || chan.buffer == "")return 0;
      if
       (chan.fd
        &&
        caml_global_data.fds[chan.fd]
        &&
        caml_global_data.fds[chan.fd].output)
       {var output=caml_global_data.fds[chan.fd].output;
        switch(output.length)
         {case 2:output(chanid,chan.buffer);break;default:output(chan.buffer)}}
      chan.buffer = "";
      return 0}
    if(joo_global_object.process && joo_global_object.process.cwd)
     var caml_current_dir=joo_global_object.process.cwd().replace(/\\/g,"/");
    else
     var caml_current_dir="/static";
    if(caml_current_dir.slice(- 1) !== "/")caml_current_dir += "/";
    function caml_make_path(name)
     {name = name instanceof MlBytes?name.toString():name;
      if(name.charCodeAt(0) != 47)name = caml_current_dir + name;
      var comp=name.split("/"),ncomp=[];
      for(var i=0;i < comp.length;i++)
       switch(comp[i])
        {case "..":if(ncomp.length > 1)ncomp.pop();break;
         case ".":break;
         case "":if(ncomp.length == 0)ncomp.push("");break;
         default:ncomp.push(comp[i]);break}
      ncomp.orig = name;
      return ncomp}
    function caml_raise_no_such_file(name)
     {name = name instanceof MlBytes?name.toString():name;
      caml_raise_sys_error(name + ": No such file or directory")}
    function caml_string_of_array(a){return new MlBytes(4,a,a.length)}
    function caml_string_bound_error()
     {caml_invalid_argument("index out of bounds")}
    function caml_bytes_unsafe_get(s,i)
     {switch(s.t & 6)
       {default:if(i >= s.c.length)return 0;case 0:return s.c.charCodeAt(i);
        case 4:return s.c[i]
        }}
    function caml_bytes_get(s,i)
     {if(i >>> 0 >= s.l)caml_string_bound_error();
      return caml_bytes_unsafe_get(s,i)}
    function caml_ml_bytes_length(s){return s.l}
    function MlFile(){}
    function MlFakeFile(content){this.data = content}
    MlFakeFile.prototype = new MlFile();
    MlFakeFile.prototype.truncate
    =
    function(len)
     {var old=this.data;
      this.data = caml_create_bytes(len | 0);
      caml_blit_bytes(old,0,this.data,0,len)};
    MlFakeFile.prototype.length
    =
    function(){return caml_ml_bytes_length(this.data)};
    MlFakeFile.prototype.write
    =
    function(offset,buf,pos,len)
     {var clen=this.length();
      if(offset + len >= clen)
       {var new_str=caml_create_bytes(offset + len),old_data=this.data;
        this.data = new_str;
        caml_blit_bytes(old_data,0,this.data,0,clen)}
      caml_blit_bytes(buf,pos,this.data,offset,len);
      return 0};
    MlFakeFile.prototype.read
    =
    function(offset,buf,pos,len)
     {var clen=this.length();
      caml_blit_bytes(this.data,offset,buf,pos,len);
      return 0};
    MlFakeFile.prototype.read_one
    =
    function(offset){return caml_bytes_get(this.data,offset)};
    MlFakeFile.prototype.close = function(){};
    MlFakeFile.prototype.constructor = MlFakeFile;
    function MlFakeDevice(root,f)
     {this.content = {};this.root = root;this.lookupFun = f}
    MlFakeDevice.prototype.nm = function(name){return this.root + name};
    MlFakeDevice.prototype.lookup
    =
    function(name)
     {if(! this.content[name] && this.lookupFun)
       {var
         res=
          this.lookupFun(caml_new_string(this.root),caml_new_string(name));
        if(res !== 0)this.content[name] = new MlFakeFile(res[1])}};
    MlFakeDevice.prototype.exists
    =
    function(name)
     {if(name == "")return 1;
      var name_slash=name + "/",r=new RegExp("^" + name_slash);
      for(var n in this.content)if(n.match(r))return 1;
      this.lookup(name);
      return this.content[name]?1:0};
    MlFakeDevice.prototype.readdir
    =
    function(name)
     {var
       name_slash=name == ""?"":name + "/",
       r=new RegExp("^" + name_slash + "([^/]*)"),
       seen={},
       a=[];
      for(var n in this.content)
       {var m=n.match(r);
        if(m && ! seen[m[1]]){seen[m[1]] = true;a.push(m[1])}}
      return a};
    MlFakeDevice.prototype.is_dir
    =
    function(name)
     {var
       name_slash=name == ""?"":name + "/",
       r=new RegExp("^" + name_slash + "([^/]*)"),
       a=[];
      for(var n in this.content){var m=n.match(r);if(m)return 1}
      return 0};
    MlFakeDevice.prototype.unlink
    =
    function(name)
     {var ok=this.content[name]?true:false;
      delete this.content[name];
      return ok};
    MlFakeDevice.prototype.open
    =
    function(name,f)
     {if(f.rdonly && f.wronly)
       caml_raise_sys_error
        (this.nm(name)
         +
         " : flags Open_rdonly and Open_wronly are not compatible");
      if(f.text && f.binary)
       caml_raise_sys_error
        (this.nm(name)
         +
         " : flags Open_text and Open_binary are not compatible");
      this.lookup(name);
      if(this.content[name])
       {if(this.is_dir(name))
         caml_raise_sys_error(this.nm(name) + " : is a directory");
        if(f.create && f.excl)
         caml_raise_sys_error(this.nm(name) + " : file already exists");
        var file=this.content[name];
        if(f.truncate)file.truncate();
        return file}
      else
       if(f.create)
        {this.content[name] = new MlFakeFile(caml_create_bytes(0));
         return this.content[name]}
       else
        caml_raise_no_such_file(this.nm(name))};
    MlFakeDevice.prototype.register
    =
    function(name,content)
     {if(this.content[name])
       caml_raise_sys_error(this.nm(name) + " : file already exists");
      if(content instanceof MlBytes)
       this.content[name] = new MlFakeFile(content);
      else
       if(content instanceof Array)
        this.content[name] = new MlFakeFile(caml_string_of_array(content));
       else
        if(content.toString)
         {var mlstring=caml_new_string(content.toString());
          this.content[name] = new MlFakeFile(mlstring)}};
    MlFakeDevice.prototype.constructor = MlFakeDevice;
    function caml_array_of_string(s)
     {if(s.t != 4)caml_convert_string_to_array(s);return s.c}
    function caml_bytes_unsafe_set(s,i,c)
     {c &= 0xff;
      if(s.t != 4)
       {if(i == s.c.length)
         {s.c += String.fromCharCode(c);if(i + 1 == s.l)s.t = 0;return 0}
        caml_convert_string_to_array(s)}
      s.c[i] = c;
      return 0}
    function caml_bytes_set(s,i,c)
     {if(i >>> 0 >= s.l)caml_string_bound_error();
      return caml_bytes_unsafe_set(s,i,c)}
    var Buffer=joo_global_object.Buffer;
    function MlNodeFile(fd){this.fs = require("fs");this.fd = fd}
    MlNodeFile.prototype = new MlFile();
    MlNodeFile.prototype.truncate
    =
    function(len){this.fs.ftruncateSync(this.fd,len | 0)};
    MlNodeFile.prototype.length
    =
    function(){return this.fs.fstatSync(this.fd).size};
    MlNodeFile.prototype.write
    =
    function(offset,buf,buf_offset,len)
     {var a=caml_array_of_string(buf);
      if(! (a instanceof joo_global_object.Uint8Array))
       a = new (joo_global_object.Uint8Array)(a);
      var buffer=Buffer.from(a);
      this.fs.writeSync(this.fd,buffer,buf_offset,len,offset);
      return 0};
    MlNodeFile.prototype.read
    =
    function(offset,buf,buf_offset,len)
     {var a=caml_array_of_string(buf);
      if(! (a instanceof joo_global_object.Uint8Array))
       a = new (joo_global_object.Uint8Array)(a);
      var buffer=Buffer.from(a);
      this.fs.readSync(this.fd,buffer,buf_offset,len,offset);
      for(var i=0;i < len;i++)
       caml_bytes_set(buf,buf_offset + i,buffer[buf_offset + i]);
      return 0};
    MlNodeFile.prototype.read_one
    =
    function(offset)
     {var a=new (joo_global_object.Uint8Array)(1),buffer=Buffer.from(a);
      this.fs.readSync(this.fd,buffer,0,1,offset);
      return buffer[0]};
    MlNodeFile.prototype.close = function(){this.fs.closeSync(this.fd)};
    MlNodeFile.prototype.constructor = MlNodeFile;
    function MlNodeDevice(root){this.fs = require("fs");this.root = root}
    MlNodeDevice.prototype.nm = function(name){return this.root + name};
    MlNodeDevice.prototype.exists
    =
    function(name){return this.fs.existsSync(this.nm(name))?1:0};
    MlNodeDevice.prototype.readdir
    =
    function(name){return this.fs.readdirSync(this.nm(name))};
    MlNodeDevice.prototype.is_dir
    =
    function(name){return this.fs.statSync(this.nm(name)).isDirectory()?1:0};
    MlNodeDevice.prototype.unlink
    =
    function(name)
     {var b=this.fs.existsSync(this.nm(name))?1:0;
      this.fs.unlinkSync(this.nm(name));
      return b};
    MlNodeDevice.prototype.open
    =
    function(name,f)
     {var consts=require("constants"),res=0;
      for(var key in f)
       switch(key)
        {case "rdonly":res |= consts.O_RDONLY;break;
         case "wronly":res |= consts.O_WRONLY;break;
         case "append":res |= consts.O_WRONLY | consts.O_APPEND;break;
         case "create":res |= consts.O_CREAT;break;
         case "truncate":res |= consts.O_TRUNC;break;
         case "excl":res |= consts.O_EXCL;break;
         case "binary":res |= consts.O_BINARY;break;
         case "text":res |= consts.O_TEXT;break;
         case "nonblock":res |= consts.O_NONBLOCK;break
         }
      var fd=this.fs.openSync(this.nm(name),res);
      return new MlNodeFile(fd)};
    MlNodeDevice.prototype.rename
    =
    function(o,n){this.fs.renameSync(this.nm(o),this.nm(n))};
    MlNodeDevice.prototype.constructor = MlNodeDevice;
    var caml_root=caml_current_dir.match(/[^\/]*\//)[0];
    function fs_node_supported()
     {return typeof joo_global_object.process
             !==
             "undefined"
             &&
             typeof joo_global_object.process.versions
             !==
             "undefined"
             &&
             typeof joo_global_object.process.versions.node
             !==
             "undefined"}
    var jsoo_mount_point=[];
    if(fs_node_supported())
     jsoo_mount_point.push
      ({path:caml_root,device:new MlNodeDevice(caml_root)});
    else
     jsoo_mount_point.push
      ({path:caml_root,device:new MlFakeDevice(caml_root)});
    jsoo_mount_point.push
     ({path:caml_root + "static/",
       device:new MlFakeDevice(caml_root + "static/")});
    function resolve_fs_device(name)
     {var
       path=caml_make_path(name),
       name=path.join("/"),
       name_slash=name + "/",
       res;
      for(var i=0;i < jsoo_mount_point.length;i++)
       {var m=jsoo_mount_point[i];
        if
         (name_slash.search(m.path)
          ==
          0
          &&
          (! res || res.path.length < m.path.length))
         res
         =
         {path:m.path,
          device:m.device,
          rest:name.substring(m.path.length,name.length)}}
      return res}
    function caml_ml_string_length(s){return s.l}
    function caml_std_output(chanid,s)
     {var
       chan=caml_ml_channels[chanid],
       str=caml_new_string(s),
       slen=caml_ml_string_length(str);
      chan.file.write(chan.offset,str,0,slen);
      chan.offset += slen;
      return 0}
    function js_print_stderr(s)
     {var g=joo_global_object;
      if(g.process && g.process.stdout && g.process.stdout.write)
       g.process.stderr.write(s);
      else
       {if(s.charCodeAt(s.length - 1) == 10)s = s.substr(0,s.length - 1);
        var v=g.console;
        v && v.error && v.error(s)}}
    function js_print_stdout(s)
     {var g=joo_global_object;
      if(g.process && g.process.stdout && g.process.stdout.write)
       g.process.stdout.write(s);
      else
       {if(s.charCodeAt(s.length - 1) == 10)s = s.substr(0,s.length - 1);
        var v=g.console;
        v && v.log && v.log(s)}}
    function caml_sys_open_internal(idx,output,file,flags)
     {if(caml_global_data.fds === undefined)
       caml_global_data.fds = new Array();
      flags = flags?flags:{};
      var info={};
      info.file = file;
      info.offset = flags.append?file.length():0;
      info.flags = flags;
      info.output = output;
      caml_global_data.fds[idx] = info;
      if(! caml_global_data.fd_last_idx || idx > caml_global_data.fd_last_idx)
       caml_global_data.fd_last_idx = idx;
      return idx}
    function caml_sys_open(name,flags,_perms)
     {var f={};
      while(flags)
       {switch(flags[1])
         {case 0:f.rdonly = 1;break;
          case 1:f.wronly = 1;break;
          case 2:f.append = 1;break;
          case 3:f.create = 1;break;
          case 4:f.truncate = 1;break;
          case 5:f.excl = 1;break;
          case 6:f.binary = 1;break;
          case 7:f.text = 1;break;
          case 8:f.nonblock = 1;break
          }
        flags = flags[2]}
      if(f.rdonly && f.wronly)
       caml_raise_sys_error
        (name.toString()
         +
         " : flags Open_rdonly and Open_wronly are not compatible");
      if(f.text && f.binary)
       caml_raise_sys_error
        (name.toString()
         +
         " : flags Open_text and Open_binary are not compatible");
      var
       root=resolve_fs_device(name),
       file=root.device.open(root.rest,f),
       idx=caml_global_data.fd_last_idx?caml_global_data.fd_last_idx:0;
      return caml_sys_open_internal(idx + 1,caml_std_output,file,f)}
    caml_sys_open_internal
     (0,caml_std_output,new MlFakeFile(caml_create_bytes(0)));
    caml_sys_open_internal
     (1,js_print_stdout,new MlFakeFile(caml_create_bytes(0)));
    caml_sys_open_internal
     (2,js_print_stderr,new MlFakeFile(caml_create_bytes(0)));
    function caml_ml_open_descriptor_in(fd)
     {var data=caml_global_data.fds[fd];
      if(data.flags.wronly)caml_raise_sys_error("fd " + fd + " is writeonly");
      var
       channel=
        {file:data.file,
         offset:data.offset,
         fd:fd,
         opened:true,
         out:false,
         refill:null};
      caml_ml_channels[channel.fd] = channel;
      return channel.fd}
    function caml_ml_open_descriptor_out(fd)
     {var data=caml_global_data.fds[fd];
      if(data.flags.rdonly)caml_raise_sys_error("fd " + fd + " is readonly");
      var
       channel=
        {file:data.file,
         offset:data.offset,
         fd:fd,
         opened:true,
         out:true,
         buffer:""};
      caml_ml_channels[channel.fd] = channel;
      return channel.fd}
    function caml_ml_out_channels_list()
     {var l=0;
      for(var c=0;c < caml_ml_channels.length;c++)
       if
        (caml_ml_channels[c]
         &&
         caml_ml_channels[c].opened
         &&
         caml_ml_channels[c].out)
        l = [0,caml_ml_channels[c].fd,l];
      return l}
    function caml_obj_tag(x)
     {return x instanceof Array?x[0]:x instanceof MlBytes?252:1000}
    function caml_register_global(n,v,name_opt)
     {if(name_opt && joo_global_object.toplevelReloc)
       n = joo_global_object.toplevelReloc(name_opt);
      caml_global_data[n + 1] = v;
      if(name_opt)caml_global_data[name_opt] = v}
    var caml_named_values={};
    function caml_jsbytes_of_string(s)
     {if((s.t & 6) != 0)caml_convert_string_to_bytes(s);return s.c}
    function caml_register_named_value(nm,v)
     {caml_named_values[caml_jsbytes_of_string(nm)] = v;return 0}
    function caml_string_of_bytes(s){return s}
    function caml_sys_const_backend_type()
     {return [0,caml_new_string("js_of_ocaml")]}
    function caml_return_exn_constant(tag){return tag}
    function caml_named_value(nm){return caml_named_values[nm]}
    function caml_wrap_exception(e)
     {if(e instanceof Array)return e;
      if
       (joo_global_object.RangeError
        &&
        e instanceof joo_global_object.RangeError
        &&
        e.message
        &&
        e.message.match(/maximum call stack/i))
       return caml_return_exn_constant(caml_global_data.Stack_overflow);
      if
       (joo_global_object.InternalError
        &&
        e instanceof joo_global_object.InternalError
        &&
        e.message
        &&
        e.message.match(/too much recursion/i))
       return caml_return_exn_constant(caml_global_data.Stack_overflow);
      if(e instanceof joo_global_object.Error && caml_named_value("jsError"))
       return [0,caml_named_value("jsError"),e];
      return [0,caml_global_data.Failure,caml_js_to_string(String(e))]}
    function caml_call1(f,a0)
     {return f.length == 1?f(a0):caml_call_gen(f,[a0])}
    var
     Out_of_memory=[248,caml_new_string("Out_of_memory"),-1],
     Sys_error=[248,caml_new_string("Sys_error"),-2],
     Failure=[248,caml_new_string("Failure"),-3],
     Invalid_argument=[248,caml_new_string("Invalid_argument"),-4],
     End_of_file=[248,caml_new_string("End_of_file"),-5],
     Division_by_zero=[248,caml_new_string("Division_by_zero"),-6],
     Not_found=[248,caml_new_string("Not_found"),-7],
     Match_failure=[248,caml_new_string("Match_failure"),-8],
     Stack_overflow=[248,caml_new_string("Stack_overflow"),-9],
     Sys_blocked_io=[248,caml_new_string("Sys_blocked_io"),-10],
     Assert_failure=[248,caml_new_string("Assert_failure"),-11],
     Undefined_recursive_module=
      [248,caml_new_string("Undefined_recursive_module"),-12];
    caml_register_global
     (11,Undefined_recursive_module,"Undefined_recursive_module");
    caml_register_global(10,Assert_failure,"Assert_failure");
    caml_register_global(9,Sys_blocked_io,"Sys_blocked_io");
    caml_register_global(8,Stack_overflow,"Stack_overflow");
    caml_register_global(7,Match_failure,"Match_failure");
    caml_register_global(6,Not_found,"Not_found");
    caml_register_global(5,Division_by_zero,"Division_by_zero");
    caml_register_global(4,End_of_file,"End_of_file");
    caml_register_global(3,Invalid_argument,"Invalid_argument");
    caml_register_global(2,Failure,"Failure");
    caml_register_global(1,Sys_error,"Sys_error");
    caml_register_global(0,Out_of_memory,"Out_of_memory");
    caml_fresh_oo_id(0);
    var
     _f_=caml_new_string(""),
     _d_=caml_new_string("String.concat"),
     _m_=caml_new_string("Js_of_ocaml__Js.Error"),
     _x_=caml_new_string(":"),
     _w_=caml_new_string("}"),
     _y_=caml_new_string(","),
     _z_=caml_new_string("{"),
     _A_=caml_new_string("cannot parse json "),
     _t_=caml_new_string('"'),
     _u_=caml_new_string('"'),
     _B_=caml_new_string("#3aa757"),
     _C_=caml_new_string("color");
    function _a_(_al_,_ak_)
     {var
       _am_=caml_ml_string_length(_al_),
       _an_=caml_ml_string_length(_ak_),
       _ao_=caml_create_bytes(_am_ + _an_ | 0);
      caml_blit_string(_al_,0,_ao_,0,_am_);
      caml_blit_string(_ak_,0,_ao_,_am_,_an_);
      return caml_string_of_bytes(_ao_)}
    caml_ml_open_descriptor_in(0);
    caml_ml_open_descriptor_out(1);
    caml_ml_open_descriptor_out(2);
    caml_fresh_oo_id(0);
    typeof caml_sys_const_backend_type(0) === "number";
    function _c_(_ah_,_ag_)
     {if(_ag_)
       {var _ai_=_ag_[2],_aj_=caml_call1(_ah_,_ag_[1]);
        return [0,_aj_,_c_(_ah_,_ai_)]}
      return 0}
    function _e_(_ab_,_aa_)
     {if(_aa_)
       {var _ac_=caml_ml_string_length(_ab_),_U_=0,_T_=_aa_,_ad_=0;
        for(;;)
         {if(_T_)
           {var _V_=_T_[2],_W_=_T_[1];
            if(_V_)
             {var _X_=(caml_ml_string_length(_W_) + _ac_ | 0) + _U_ | 0;
              if(_U_ <= _X_){var _U_=_X_,_T_=_V_;continue}
              throw [0,Invalid_argument,_d_]}
            var _ae_=caml_ml_string_length(_W_) + _U_ | 0}
          else
           var _ae_=_U_;
          var _af_=caml_create_bytes(_ae_),_Z_=_ad_,_Y_=_aa_;
          for(;;)
           {if(_Y_)
             {var ___=_Y_[2],_$_=_Y_[1];
              if(___)
               {caml_blit_string(_$_,0,_af_,_Z_,caml_ml_string_length(_$_));
                caml_blit_string
                 (_ab_,0,_af_,_Z_ + caml_ml_string_length(_$_) | 0,_ac_);
                var
                 _Z_=(_Z_ + caml_ml_string_length(_$_) | 0) + _ac_ | 0,
                 _Y_=___;
                continue}
              caml_blit_string(_$_,0,_af_,_Z_,caml_ml_string_length(_$_))}
            return caml_string_of_bytes(_af_)}}}
      return _f_}
    caml_fresh_oo_id(0);
    var _g_=[0,0];
    function _h_(_S_){_g_[1] = [0,_S_,_g_[1]];return 0}
    var
     _j_=joo_global_object,
     _l_=_j_.Array,
     _n_=[248,_m_,caml_fresh_oo_id(0)],
     _o_=[0,_n_,{}],
     _k_=undefined,
     _i_=caml_obj_tag(_o_) === 248?_o_:_o_[1];
    caml_register_named_value(caml_new_string("jsError"),_i_);
    (function(exn){throw exn});
    var _p_=_j_.JSON;
    _h_
     (function(_R_)
       {return _R_[1] === _n_?[0,caml_js_to_string(_R_[2].toString())]:0});
    _h_
     (function(_Q_)
       {return _Q_ instanceof _l_?0:[0,caml_js_to_string(_Q_.toString())]});
    caml_fresh_oo_id(0);
    _j_.HTMLElement === _k_;
    var _q_=caml_js_get_console(0);
    function _r_(_P_){return _q_.log(_P_.toString())}
    function _s_(_O_){return _a_(_u_,_a_(_O_,_t_))}
    function _v_(_I_)
     {var
       _J_=
        _a_
         (_z_,
          _a_
           (_e_
             (_y_,
              _c_
               (function(_M_)
                 {var _N_=_a_(_x_,_M_[2]);return _a_(_s_(_M_[1]),_N_)},
                _I_)),
            _w_));
      try
       {var _K_=_p_.parse(_J_.toString());return _K_}
      catch(_L_){_r_(_a_(_A_,_J_));return {}}}
    _q_.log(_v_([0,[0,_C_,_s_(_B_)],0]));
    function _b_(_D_)
     {var _E_=_D_;
      for(;;)
       {if(_E_)
         {var _F_=_E_[2],_G_=_E_[1];
          try
           {caml_ml_flush(_G_)}
          catch(_H_)
           {_H_ = caml_wrap_exception(_H_);if(_H_[1] !== Sys_error)throw _H_}
          var _E_=_F_;
          continue}
        return 0}}
    _b_(caml_ml_out_channels_list(0));
    return}
  (function(){return this}()));
