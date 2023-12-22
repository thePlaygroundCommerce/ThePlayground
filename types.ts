import { Dispatch, SetStateAction } from "react";
import { CatalogImage, CatalogObject, Order, OrderLineItem } from "square";

export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement?: React.JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  // props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  // props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}

export type CategoryTree = {
  [key: string]: {
    id: string;
    categoryList: CategoryTree[];
  };
};

export type SplitCategoryNameWithId = {
  id: string;
  category: string;
};

export type NavigationContextType = {
  accountNavigation: [
    AccountNavigation,
    Dispatch<SetStateAction<AccountNavigation>>
  ];
  apparelNavigation: [
    ApparelNavigation,
    Dispatch<SetStateAction<ApparelNavigation>>
  ];
  apparelCategories: CatalogObject[];
  handleNavigationChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type AccountNavigation = {
  activeIndex: number;
  formattedCategories: CategoryTree[];
  components: React.FC[];
  As: string;
  // onNavChange: e => onNavIndexChange(e.target.id),
};
export type ApparelNavigation = {
  activeIndex: number;
  unformattedCategories: CatalogObject[];
  formattedCategories: CategoryTree;
  currentCategoryId: string;
};



export type CartContextType = {
  cart: Order;
  updateCart: () => void;
  createCart: () => void;
  addCartItem: (lineItem: OrderLineItem, lineItemImage?: CatalogImage) => void;
  deleteCartItem: () => void;
  toggleCartOverlay: () => void;
};