# table文档说明(v1.0.0)

table组件的代码地址:src\components\common\table\table.vue

#### 1. table组件传递prop参数

| 参数名称   | 说明                                                         | 类型    | 是否必填 | 默认值 |
| ---------- | ------------------------------------------------------------ | ------- | -------- | ------ |
| tableStyle | 表格的数据的结构(即:实例中config.js文件中的数据)             | Object  | 是       | ×      |
| sourceData | 表格展示的数据                                               | Array   | 是       | ×      |
| showType   | 表格数据来源：0代表数据请求样式，1代表一次把全局数据传递过来 | Number  | 否       | 0      |
| pageNum    | 当前页码                                                     | Number  | 否       | 1      |
| pageSizes  | 当前页码数据条数                                             | Number  | 否       | 10     |
| loading    | 加载loading动画                                              | Boolean | 否       | true   |

**注意**：由于在组件中使用了$attrs,elementUI中对于table设置的属性也是支持，但是不要在table中设置data属性

#### 2.table中事件的传递

| 方法名称         | 说明                                             | 方法参数个数 | 参数说明                                                     |
| ---------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| selectAll        | table有选中框的时候,选择单个或者全选的时候，触发 | 1            | 表示当前选中数据,数据类型为数组。数组里面包含的时候行数据    |
| handleSizeChange | table切换分页的时候调用                          | 1            | 返回的数据格式为一个对象，对象中包含pagenum和pagesize。pagesize表示当前一个页码包含数据的个数。pagenum表示当前页码数 |

**主要** ：在处理table事件的时候，运动了$listeners来处理事件，所以该组件支持ElementUI中对table的事件处理

#### 3.table的配置文件(简称config)参数使用

config文件的目的是为了让table能够按照config的配置信息展示自己的table。config文件本身导出的是一个对象。对象拥有4个key,即title,tool,tableOperation,params

##### 3.1 title 标题

title属性的目的是为了描述这个文件的，该字段本身不参与代码的，纯展示作用

##### 3.2 tool操作栏

tool为操作栏,与table独立分开的，为的是给table提供一个工具方法。该键对应的值应为一个数组。数组中对象属性如下表所示

| 参数     | 参数类型 | 参数描述                                                   |
| -------- | -------- | ---------------------------------------------------------- |
| label    | string   | 功能按钮的名称                                             |
| event    | string   | 功能按钮事件的名称                                         |
| icon     | string   | 功能按钮的图标，这里需要icons目录下面的svg图标             |
| disabled | boolean  | 功能按钮是否可以点击 true表示不可以点击，false表示可以点击 |

#### 3.3  tableOperation 表单的操作栏

tableOperation是为table的每一行提供一个操作栏

##### 3.3.1 tableOperation 属性说明

| 参数       | 参数说明         | 参数可选值      | 参数类型             | 默认值         |
| ---------- | ---------------- | --------------- | -------------------- | -------------- |
| label      | 操作栏的标题     | 无              | String               | 无             |
| fixed      | 操作栏固定位置   | right/left/none | String               | none           |
| slot       | 操作栏的插槽     | 无              | String               | tableOperation |
| operations | 操作栏包含的功能 | 无              | Array[object,object] | 无             |

##### 3.3.2  operations属性说明

| 参数         | 参数说明             | 参数可选值 | 参数类型 | 默认值 |
| ------------ | -------------------- | ---------- | -------- | ------ |
| label        | 功能名称             | 无         | String   | 无     |
| event        | 事件名称             | 无         | String   | 无     |
| formatterFun | 通过函数返回功能名称 | 无         | Function |        |

**注意**  formatterFun 的只有一个参数scope. scope的值是table中插槽的值，在scope中可以解构出row属性。row代表table这一行(row)的数据。需要返回一个字符串，不返回会导致功能名称为空的情况

##### 3.3.3 tableOperation 插槽

操作栏可以通过插槽实现，插槽的名称为tableOperation中的slot属性，如果slot属性不存在，那么会默认为tableOperation.在插槽的slot-scope中可以解构出每一行的数据(row)和当前的表单操作栏(table)

#### 3.4 params属性说明

##### 3.4.1 tableShowField说明

tableShowField表示是否可以渲染这列的字段

##### 3.4.2 tableHide 说明

tableHide 表示该列是否第一时间展示字段

##### 3.4.3 select

select表示是否出现check按钮即选中和全选按钮

##### 3.4.4 index属性说明

index属于table的序号,数据类型为对象。对象包含属性如下表所示

| 参数        | 参数说明                                  | 参数可选值 | 参数类型 | 默认值 |
| ----------- | ----------------------------------------- | ---------- | -------- | ------ |
| label       | 序号列的名称                              | 无         | String   | 无     |
| show        | show对应的是param的tableShowField字段的值 | 无         | Boolean  | 无     |
| minWidth    | 列的最小宽度                              | 无         | Number   | 100    |
| fixed       | 固定位置                                  | left/right | Strng    | none   |
| indexMethod | 自定义序号的值                            | 无         | Function | none   |

**注意** indexMethod的返回值会展示成为列的序号。indexMethod拥有一个回调参数，表示当前的序号

##### 3.4.5业务属性字段

业务属性字段是table的重要属性，不能的属性字段会在table展示不同的样式出来。目前支持的样式哟如下几种

普通展示,函数读取展示，切换按钮，超链接展示，文本修改展示，tag展示。

###### 3.4.5.1 普通展示

普通列表展示表示直接读取源数据中当前行对象对应的字段的值。需要注意的是，在当前行数据对象最好拥有这个属性，这样才能正确的展示出数据。如果没有该属性字段的话，会导致展示数据为空的情况。该类型中包括的属性如下表所示

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readType | TableConst | 类型TableConst.NORMAL,可不填                                 |

###### 3.4.5.2 函数读取展示

函数读取展示不必要求当前的key在源函数中是否存在，是一种方便读取数据的方式，但是需要在对象中创建一个函数来读取并且返回，从而可以正确的展示到table中

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readFunc | Function   | 特定某一行的数据                                             |
| readType | TableConst | 类型TableConst.FUNCTION,必填                                 |

**注意** readFunc 需要一个返回值，返回值就是这一行中这个字段对应的值。它的回调包括4个回调参数。第一个函数表示该行的源数据，第二个参数列的参数(即本省对象),第三个参数代表当前的行数，第四个参数代表源数据(是个数组)

###### 3.4.5.3 切换按钮展示(switch)

切换按钮展示主要是展示一个切换按钮的展示

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readFunc | Function   | 特定某一行的数据                                             |
| event    | String     | 点击按钮触发事件                                             |
| readType | TableConst | 类型TableConst.SWITCH,必填                                   |

**注意**：readFunc 需要返回一个类(src\class\tableSwitch.js)来修饰当前这个开关。该类的构造函数一次是状态(真/假) 激活状态的颜色，未激活的颜色。激活状态的颜色的颜色默认值为\#13ce66， 未激活的颜色默认值为未激活的颜色

###### 3.4.5.4 超链接展示

在table中展示有个带点击事件的超链接文本标签

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readFunc | Function   | 特定某一行的数据                                             |
| event    | String     | 点击按钮触发事件                                             |
| readType | TableConst | 类型TableConst.LINK,必填                                     |

**注意** readFunc和3.4.5.2一样

###### 3.4.5.5 文本修改展示

在table中展示可以修改文本的样式

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readFunc | Function   | 特定某一行的数据                                             |
| event    | String     | 点击按钮触发事件                                             |
| readType | TableConst | 类型TableConst.MODIFY,必填                                   |

3.4.5.6 tag展示

在tag中展示一个tag标签

| 参数     | 参数类型   | 参数说明                                                     |
| -------- | ---------- | ------------------------------------------------------------ |
| label    | String     |                                                              |
| show     | Boolean    | show对应的是param的tableShowField字段的值.控制是否显示       |
| hide     | Boolean    | show对应的是param的tableShowField字段的值。控制是否第一时间显示 |
| readFunc | Function   | 特定某一行的数据                                             |
| event    | String     | 点击按钮触发事件                                             |
| readType | TableConst | 类型TableConst.TAG,必填                                      |

**注意** readFunc需要返回一个类来修饰tag标签。该类定义路径(src\class\tableTag.js)。在类中的构造器中需要传入三个参数，第一个参数为tag的颜色，默认值为#2ec589，第二个值为tag展示的文字，第三个值为tag展示的icon,后两个默认值为空（“”）

##### 3.5 事件回调参数说明

在事件的回调参数中都包含4个参数，第一个参数代表当前行的数据，第二个数据在当前列的数据，第三个数据代表当前行的序号，第四个参数代表源数据(类型为Array)