## @td-design/svg-icon-cli

本工具是基于[react-native-iconfont-cli](https://github.com/iconfont-cli/react-native-iconfont-cli)的基础上修改而来。因为 UI 设计师使用`Figma`产出设计稿，所以项目中用到的图标不会使用 iconfont 或者图片，而是直接导出 svg 格式。
借助这个工具，就可以很方便地把本地 svg 转成图标组件在项目中使用。为此，精简了原项目中很多不需要的功能（比如拉取 iconfont 图标库、支持导出 js 文件等），以满足我们自己的需求。

## 特性

1、纯组件，不依赖字体，体积小
<br />
2、支持渲染多色彩图标，支持自定义颜色
<br />
3、支持热更新
<br />
4、自动化生成图标组件，默认支持 typescript

## Step 1

安装插件

```bash
# Yarn
yarn add react-native-svg
yarn add @td-design/svg-icon-cli --dev

# Npm
npm install react-native-svg
npm install @td-design/svg-icon-cli --save-dev
```

# Step 2

生成配置文件

```bash
npx svgicon-init
```

此时项目根目录会生成一个`svgicon.json`的文件，内容如下：

```json
{
  "save_dir": "", // 生成图标文件的保存位置，推荐 ./src/components/iconfont
  "trim_icon_prefix": "icon", // 图标文件的统一前缀
  "default_icon_size": 20, // 图标文件的默认大小
  "icon_svg": "./icon-svg", // 图标文件的存放位置
  "for_library": false // 是否为组件库生成图标，默认是false，表示是为项目生成图标
}
```

# Step 3

开始生成 React-Native 标准组件

```bash
npx svgicon-rn
```

# 使用

```typescript jsx
import { SvgIcon } from "components";

export const App = () => {
  return (
    <View>
      <SvgIcon name="alipay" size={20} />
      <SvgIcon name="wechat" />
    </View>
  );
};
```

### 图标尺寸

根据配置`default_icon_size`，每个图标都会有一个默认的尺寸，你可以随时覆盖。

```typescript jsx
<SvgIcon name="alipay" size={20} />
```

### 图标单色

单色图标，如果不指定颜色值，图标将渲染原本的颜色。如果你想设置为其他的颜色，那么设置一个你想要的颜色即可。

**注意：如果你在 props 传入的 color 是字符串而不是数组，那么即使原本是多色彩的图标，也会变成单色图标。**

```typescript jsx
<SvgIcon name="alipay" color="green" />
```

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/one-color-icon.png?raw=true)

### 图标多色彩

多色彩的图标，如果不指定颜色值，图标将渲染原本的多色彩。如果你想设置为其他的颜色，那么设置一组你想要的颜色即可

```typescript jsx
<IconFont name="alipay" color={["green", "orange"]} />
```

颜色组的数量以及排序，需要根据当前图标的信息来确定。您需要进入图标组件中查看并得出结论。

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/multi-color-icon.png?raw=true)

# 更新图标

当`icon_svg`文件夹下的 svg 文件发生变化时，只需要重新执行下面的命令即可生成最新的图标组件

```bash
npx svgicon-rn
```
