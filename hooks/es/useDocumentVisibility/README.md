# useDocumentVisibility

可以获取页面可见状态的 Hook。

## API

```
const documentVisibility = useDocumentVisibility();
```

### Result
| 参数    | 说明                                         | 类型                   | 值 |
|---------|----------------------------------------------|------------------------|--------|
| documentVisibility | 判断 document 是否在是否处于可见状态 | string | 'visible' \| 'hidden' \| 'prerender'  \| undefined    |

> 如果没有 document 环境返回 `undefined`
