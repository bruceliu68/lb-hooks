# useScroll

获取元素的滚动状态。

## API

```ts
const pisition = useSize(target);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Ref 对象  |  HTMLElement \| (() => HTMLElement) \| Document \| React.MutableRefObject  | Document    |

### Result

| 参数 | 说明     | 类型 |
|------|----------|------|
| position | 滚动容器当前的滚动位置 | `{x: number, y: number}`  |
