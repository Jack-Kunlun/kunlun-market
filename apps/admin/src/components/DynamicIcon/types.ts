import * as AllIcons from "@ant-design/icons";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickProps<T> = T extends (props: infer P1) => any ? P1 : T extends React.ComponentClass<infer P2> ? P2 : unknown;

type AllKeys = keyof typeof AllIcons;

type PickCapitalizeAsComp<K extends AllKeys> = K extends Capitalize<K> ? K : never;

export type IconNames = PickCapitalizeAsComp<AllKeys>;

export type PickIconPropsOf<K extends IconNames> = PickProps<(typeof AllIcons)[K]>;

export const iconNames = Object.keys(AllIcons) as IconNames[];
