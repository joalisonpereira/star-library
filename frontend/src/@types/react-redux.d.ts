import "react-redux";
import { StoreState } from "src/store";

declare module "react-redux" {
  declare const useSelector: <TState = StoreState, Selected = unknown>(
    selector: (state: TState) => Selected,
    equalityFn?: EqualityFn<Selected> | undefined
  ) => Selected;
}
