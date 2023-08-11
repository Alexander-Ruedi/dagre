interface useTimeoutProps {
  timeoutInMS: number;
}

export const useTimeout: (props: useTimeoutProps) => Promise<boolean> = (props) =>
  new Promise((resolveInner) => {
    setTimeout(resolveInner, props.timeoutInMS);
  });
