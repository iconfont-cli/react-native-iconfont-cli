## iconfont-cli

通常地，当我们想在RN里使用iconfont，我们可能会借助`react-native-vector-icons`导入ttf字体文件，或者直接下载svg文件到本地，然后单个使用。

使用ttf字体有一个弊端，就是每次更新图标，都要相应的更新ttf文件，然后再次打包发布APP。而且ttf不支持多种色彩的图标，导致所有图标都是单色。

今天，我将用纯Javascript实现iconfont到React组件的转换操作，**不需要依赖ttf字体文件**。这是一个很实用的功能，有了纯js组件，我们可以轻易地做`热更新`操作。

## 优势：
1、不依赖字体文件，支持热更新
<br />
2、自动化生成图标组件，带ts类型提示
<br />
3、支持es6和typescript两种模式
<br />
4、图标多种色彩时，原样输出

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
./node_modules/.bin/iconfont init
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
  "symbol_url": "",
  "safe_dir": "./src/iconfont",
  "trim_icon_prefix": "icon-",
  "default_font_size": 18,
  "use_typescript": false
}
```
### symbol_url
来自[iconfont](http://iconfont.cn)官网提供的项目链接
![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/symbol-url.png?raw=true)

### safe_dir
根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

注意，这个选项只针对 `<Icon />` 组件有效

### default_font_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入props的方式改变这个size值。

### use_typescript
这个选项将决定生成的图标组件是`.tsx`还是`.jsx`后缀。如果该值为false，我们将为您生成`.jsx`和`.d.ts`文件，以确保您能享受到最好的书写体验。


# Step 4
开始生成React组件
```bash
./node_modules/.bin/iconfont
```
生成后查看您设置的保存目录中是否含有所有的图标

# Step 5
使用这些图标。现在我们提供了两种引入方式供您选择：

1、使用汇总 `<Icon />`，它包含了所有的图标信息：
```typescript jsx
import Icon from '../src/iconfont/Icon';

export const App = () => {
  return (
    <div>
      <Icon name="user" size={20} />
      <Icon name="sky" />
    </div>
  );
};
```

2、使用单个图标，它更加精准，您上线时打出来的包也会更小：

```typescript jsx
import IconUser from '../src/iconfont/IconUser';
import IconSky from '../src/iconfont/IconSky';

export const App = () => {
  return (
    <div>
      <IconUser size={20} />
      <IconSky />
    </div>
  );
};
```

--------

欢迎使用，并给我一些反馈和建议，让这个库做的更好
