type TSkeletonShape = "row" | "card";

interface ITabScreen {
  readonly title: string;
  readonly shape: TSkeletonShape;
  readonly count: number;
  searchPlaceholder?: string;
}

interface ISkeletonItem {
  readonly shape: TSkeletonShape;
  readonly index: number;
  readonly color: string;
}

export { type ISkeletonItem, type ITabScreen, type TSkeletonShape };
