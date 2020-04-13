## react-native-iconfont-cli
用纯JS把iconfont.cn的图标转换成RN组件，不依赖字体，支持多色彩，支持热更新

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/icons.png?raw=true)

## 痛点

通常地，当我们想在RN里使用iconfont，我们可能会借助`react-native-vector-icons`导入ttf字体文件，或者直接手动下载各个svg文件到本地，然后单个使用。

使用ttf字体有一个弊端，就是每次更新图标，都要相应的更新ttf文件，然后再次打包发布APP。而且ttf不支持多种色彩的图标，导致所有图标都是单色。如果你是借助`react-native-vector-icons`，该库内置了10多套ttf文件，合起来有`2M`左右；你可能用不到它们，但是它们仍然会被打包进你的APP里。

下载svg到本地也不方便，因为你需要额外维护一份图标字体，有可能造成线上和本地的图标不一致问题。而且如果你想动态地改变svg的渲染色彩，基本上是不可能的，只能渲染原图的颜色。

--------

为了解决这些问题，我用纯Javascript实现iconfont到React组件的转换操作，**不需要依赖ttf字体文件**，不需要手动下载图标到本地。

## 特性

1、纯组件，不依赖字体，体积小
<br />
2、支持渲染多色彩图标，支持自定义颜色
<br />
3、支持热更新
<br />
4、自动化生成图标组件，支持es6和typescript两种文件格式

## Step 1
安装插件
```bash
# Yarn
yarn add react-native-svg
yarn add react-native-iconfont-cli --dev

# Npm
npm install react-native-svg
npm install react-native-iconfont-cli --save-dev
```

# Step 2
静态链接。请注意您使用的React-Native版本号
```bash
# RN < 0.60
react-native link react-native-svg

# RN >= 0.60
cd ios && pod install
```

# Step 3
生成配置文件
```bash
npx iconfont-init
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
    "symbol_url": "请参考README.md，复制官网提供的JS链接",
    "use_typescript": false,
    "save_dir": "./src/iconfont",
    "trim_icon_prefix": "icon",
    "default_icon_size": 18
}
```
### 配置参数说明：
### symbol_url
请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js`

<br />

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

### use_typescript
如果您的项目使用Typescript编写，请设置为true。这个选项将决定生成的图标组件是`.tsx`还是`.js`后缀。

当该值为false时，我们会为您的图标生成`.js`和`.d.ts`两种文件，以便您能享受到最好的开发体验。

### save_dir
根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

### default_icon_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入props的方式改变这个size值。

# Step 4
开始生成React-Native标准组件
```bash
npx iconfont-rn
```

生成后查看您设置的保存目录中是否含有所有的图标，你可以参考[snapshots目录](https://github.com/iconfont-cli/react-native-iconfont-cli/tree/master/snapshots)的快照文件，以区分不同模式下的图标结构。

# 使用
<br />
现在我们提供了两种引入方式供您选择：

1、使用汇总`Icon`组件：
```typescript jsx
import IconFont from '../src/iconfont';

export const App = () => {
  return (
    <View>
      <IconFont name="alipay" size={20} />
      <IconFont name="wechat" />
    </View>
  );
};
```

2、使用单个图标。这样可以避免没用到的图标也打包进App：

```typescript jsx
import IconAlipay from '../src/iconfont/IconAlipay';
import IconWechat from '../src/iconfont/IconWechat';

export const App = () => {
  return (
    <View>
      <IconAlipay size={20} />
      <IconWechat />
    </View>
  );
};
```

### 图标尺寸
根据配置`default_icon_size`，每个图标都会有一个默认的尺寸，你可以随时覆盖。
```typescript jsx
<IconFont name="alipay" size={20} />
```
![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/default-color-icon.png?raw=true)
### 图标单色
单色图标，如果不指定颜色值，图标将渲染原本的颜色。如果你想设置为其他的颜色，那么设置一个你想要的颜色即可。

**注意：如果你在props传入的color是字符串而不是数组，那么即使原本是多色彩的图标，也会变成单色图标。**

```typescript jsx
<IconFont name="alipay" color="green" />
```
![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/one-color-icon.png?raw=true)

### 图标多色彩
多色彩的图标，如果不指定颜色值，图标将渲染原本的多色彩。如果你想设置为其他的颜色，那么设置一组你想要的颜色即可
```typescript jsx
<IconFont name="alipay" color={['green', 'orange']} />
```
颜色组的数量以及排序，需要根据当前图标的信息来确定。您需要进入图标组件中查看并得出结论。


![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/multi-color-icon.png?raw=true)

# 更新图标
当您在iconfont.cn中的图标有变更时，只需更改配置`symbol_url`，然后再次执行`Step 4`即可生成最新的图标组件
```bash
# 修改 symbol_url 配置后执行：
npx iconfont-rn
```


# 扩展
|平台|库|
|----|---|
|小程序|[mini-program-iconfont-cli](https://github.com/iconfont-cli/mini-program-iconfont-cli)|
|Taro|[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli)|
|React H5|[react-iconfont-cli](https://github.com/iconfont-cli/react-iconfont-cli)|
|Flutter|[flutter-iconfont-cli](https://github.com/iconfont-cli/flutter-iconfont-cli)|
|Remax|[remax-iconfont-cli](https://github.com/iconfont-cli/remax-iconfont-cli)|

--------

欢迎使用，并给我一些反馈和建议，让这个库做的更好
