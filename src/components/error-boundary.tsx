import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// github: react-error-boundary
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 子组件抛出异常，此处会接收并调用
  // 只会接收渲染异常，事件异常不会进行处理
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
