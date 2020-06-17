# react hooks组件库

# 安装
```bash
npm install lb-hooks --save
```
```jsx
import { Button, Switch } from 'antd';
import { useToggle } from "lb-hooks";

export default () => {
    const { state, toggle } = useToggle();

    return (
        <div>
        <p>
            Effects：
            <Switch checked={state} onChange={toggle} />
        </p>
        <p>
            <Button type="default" onClick={() => toggle()}>Toggle</Button>
            <Button type="danger" onClick={() => toggle(false)}>Toggle False</Button>
            <Button type="primary" onClick={() => toggle(true)}>Toggle True</Button>
        </p>
        </div>
  );
}
```

# 支持按需加载（推荐）
安装babel插件
```bash
npm install babel-plugin-tnt --save-dev
```
.babelrc中添加如下配置即可
```json
"plugins": [
    [
      "babel-plugin-tnt",
      {
        "library": ["lb-hooks"]
      }
    ],
]
```