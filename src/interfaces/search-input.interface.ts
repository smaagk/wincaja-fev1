import { ChangeEvent } from "react";

export interface ISearchInput {
    label: string;
    name: string;
    search: string;
    error: boolean | undefined
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}