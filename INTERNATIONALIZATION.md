#### 代码国际化
 本框架使用的 V18i 代码国际化
  - 如何使用
    在项目中模板中直接使用$t{{key}},默认使用的是浏览器的语言
  - 如何获取 key
    key 是定义在@/src/lang 文件下对应语言的文件的文件.如果需要新的模块,也可以新建一个文件,文件必须是当前文件目录.切记:因为所有的文件需要合并,每个文件的 key 值不能相同,相同取后面文件的 key对应的值.同时文件可以使用对象嵌套,寄文件key 对应的值可以是对象,不过在使用的时候需要指定到最终的值.