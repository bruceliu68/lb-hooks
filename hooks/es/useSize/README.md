# useLocalStorage

一个可以将状态持久化存储在 localStorage 中的 Hook 。

## API

```typescript
const [state, setState] = useLocalStorage<T>(
  key: string,
  defaultValue?: T | (() => T),
): [T?, (value?: T | ((previousState: T) => T)) => void]
```
它的API和 `useState` 非常类似，但是多了一个参数 `key` ，用来指定在 localStorage 中存储时所使用的 `key` 。而它的返回值类型和 `useState` 保持了一致，当调用 `setState` 时，它会自动将新值写入到 localStorage 中。

如果想从 localStorage 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。
