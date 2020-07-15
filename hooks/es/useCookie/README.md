# useCookie
一个设置cookie的 Hook

## API

```typescript
const [value, updateCookie, deleteCookie] = useCookie(cookieName: string);
```

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| value  | 设置的cookie值                  | string    |
| updateCookie  | 更新cookie的值                  | (newValue: string, options?: Cookies.CookieAttributes) => void    |
| deleteCookie  | 删除cookie                  | () => void    |

