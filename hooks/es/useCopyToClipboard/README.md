# useCopyToClipboard
一个复制数据到剪贴板的 Hook

## API

```javascript
const [{
    value?: string;
    error?: Error;
    isCopy: boolean;
}, copyToClipboard] = useCopyToClipboard();
```

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| value  | 复制的值                  | string    |
| error  | 复制失败抛出的异常                  | Error    |
| isCopy  | 是否复制成功                  | boolean    |
| copyToClipboard  | 复制函数                  | (value: string | number)=>void    |

