# useDynamicList

一个帮助你管理列表状态，并能生成唯一 key 的 Hook。

## API

```typescript
const result: Result = useDynamicList(initialValue: T[]);
```

### Result

| 参数         | 说明         | 类型                 |  备注            |
|--------------|--------------|----------------------|---------------|
| list      | 当前的列表 | T[]              | - |
| resetList  | 重新设置 list 的值     | (list: T[]) => void;          | - |
| insert        | 在指定位置插入元素 | (index: number, obj: T) => void                | - |
| merge         | 在指定位置插入多个元素 | (index: number, obj: T[]) => void | - |
| replace          | 替换指定元素         | (index: number, obj: T) => void          | - |
| remove   | 删除指定元素     | (index: number) => void;          | - |
| getKey  | 获得某个元素的 uuid     | (index: number) => number;           | - |
| getIndex  | 获得某个key的 index     | (key: number) => number;           | - |
| push  | 在列表末尾添加元素     | (obj: T) => void;          | - |
| pop  | 移除末尾元素     | () => void;          | - |
| unshift  | 在列表起始位置添加元素    | (obj: T) => void;          | - |
| shift  | 移除起始位置元素     | () => void;          | - |

### 参数

| 参数         | 说明         | 类型                 |   |
|--------------|--------------|----------------------|---|
| initialValue      | 列表的初始值 | T[]              |   |
