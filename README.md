## react-native-iconfont-cli

fork  react-native-iconfont-cli 并且添加了 本地 svg 的支持

原库的使用: https://github.com/iconfont-cli/react-native-iconfont-cli

添加了本地 svg 支持之后的配置文件:

```
{
    "symbol_url": "请参考README.md，复制官网提供的JS链接",
    "use_typescript": false,
    "save_dir": "./src/iconfont",
    "trim_icon_prefix": "icon",
    "default_icon_size": 18,
    "local_dir": "./locals" // 唯一不同点
}
```
