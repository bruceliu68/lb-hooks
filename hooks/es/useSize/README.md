# useSize

一个用于监听 dom 节点尺寸变化的 Hook

## API

```ts
const size = useSize(target);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Refs  | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -      |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| size  | dom 节点的尺寸                         | { width: number, height: number }    |
