import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { CreateProductData, ImageField } from "@/xtypes";
import { ChangeEvent } from "react";

export const makeFormData = (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, (value as ImageField).file);
      console.log("value");
    } else if (key === "logo") {
      console.log("value", value);
      formData.append(key, (value as ImageField).file);
    } else if (key === "banner") {
      console.log("value", value);
      formData.append(key, (value as ImageField).file);
    } else if (key === "priceConfiguration" || key === "attributes") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });
  return formData;
};

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export function compareAddress(
  adr1: string | undefined,
  adr2: string | undefined
) {
  if (!adr1 || !adr2) {
    return false;
  }
  if (adr1.toLocaleLowerCase() == adr2.toLocaleLowerCase()) {
    return true;
  }
  return false;
}
