# useInViewport

一个用于判断 dom 元素是否在可视范围之内的 Hook

## API

```ts
const inViewPort = useInViewport(target);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| React.MutableRefObject | - |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| inViewPort  | 判断 dom 元素是否在可视范围之内的标志       | boolean    |
