import { RefForwardingComponent, ComponentType, ClassAttributes } from "react";

function createRef<T>(): RefObject<T>;

function forwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ComponentType<P & ClassAttributes<T>>;

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

interface HTMLAnchorElement {
  ref: any;
}
