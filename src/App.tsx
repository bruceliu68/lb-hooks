import React from 'react';
import './App.css';
// State
import UseToggleDemo from "./components/useToggle/demo";
import UseLocalStorage from "./components/useLocalStorage/demo";
import UseSessionStorage from "./components/useSessionStorage/demo";
import UseHistoryTravel from "./components/useHistoryTravel/demo";
import UseTitle from "./components/useTitle/demo";
import UseCopyToClipboard from "./components/useCopyToClipboard/demo";
import UseFavicon from "./components/useFavicon/demo";
import UseCookie from "./components/useCookie/demo";
// UI
import UseDrop from "./components/useDrop/demo";
import UseVirtualList from "./components/useVirtualList/demo";
import UseDynamicList from "./components/useDynamicList/demo";
import UseSelections from "./components/useSelections/demo";
// Dom
import UseSize from "./components/useSize/demo";
import UseDocumentVisibility from "./components/useDocumentVisibility/demo";
import UseEventListener from "./components/useEventListener/demo";
import UseFullscreen from "./components/useFullscreen/demo";
import UseHover from "./components/useHover/demo";
import UseInViewport from "./components/useInViewport/demo";
import UseKeyPress from "./components/useKeyPress/demo";
import UseMouse from "./components/useMouse/demo";
import UseScroll from "./components/useScroll/demo";
// Advanced
import UseEventEmitter from "./components/useEventEmitter/demo";
import UseCreation from "./components/useCreation/demo";
// SideEffect
import UseDebounceFn from "./components/useDebounceFn/demo";
import UseDebounce from "./components/useDebounce/demo";
import UseThrottleFn from "./components/useThrottleFn/demo";
import UseThrottle from "./components/useThrottle/demo";
import UseInterval from "./components/useInterval/demo";

function App() {
  return (
    <div className="App">
      {/* -------------SideEffect-------------- */}
      <h1>SideEffect</h1>
      <h2>useDebounceFn</h2>
      <UseDebounceFn />
      <h2>useDebounce</h2>
      <UseDebounce />
      <h2>useThrottleFn</h2>
      <UseThrottleFn />
      <h2>useThrottle</h2>
      <UseThrottle />
      <h2>useInterval</h2>
      <UseInterval />

      {/* -------------Advanced-------------- */}
      <h1>Advanced</h1>
      <h2>useEventEmitter</h2>
      <UseEventEmitter />
      <h2>useCreation</h2>
      <UseCreation />

      {/* -------------DOM-------------- */}
      <h1>DOM</h1>
      <h2>useSize</h2>
      <UseSize />
      <h2>useDocumentVisibility</h2>
      <UseDocumentVisibility />
      <h2>useEventListener</h2>
      <UseEventListener />
      <h2>useFullscreen</h2>
      <UseFullscreen />
      <h2>useHover</h2>
      <UseHover />
      <h2>useInViewport</h2>
      <UseInViewport />
      <h2>useKeyPress</h2>
      <UseKeyPress />
      <h2>useMouse</h2>
      <UseMouse />
      <h2>useScroll</h2>
      <UseScroll />

      {/* -------------UI-------------- */}
      <h1>UI</h1>
      <h2>useDrag & useDrop</h2>
      <UseDrop />
      <h2>useVirtualList</h2>
      <UseVirtualList />
      <h2>useDynamicList</h2>
      <UseDynamicList />
      <h2>useSelections</h2>
      <UseSelections />

      {/* -------------State-------------- */}
      <h1>state</h1>
      <h2>useHistoryTravel</h2>
      <UseHistoryTravel />
      <h2>useToggle</h2>
      <UseToggleDemo />
      <h2>useLocalStorage</h2>
      <UseLocalStorage />
      <h2>useSessionStorage</h2>
      <UseSessionStorage />
      <h2>useTitle</h2>
      <UseTitle />
      <h2>useCopyToClipboard</h2>
      <UseCopyToClipboard />
      <h2>useFavicon</h2>
      <UseFavicon />
      <h2>useCookie</h2>
      <UseCookie />
    </div>
  );
}

export default App;
