import { CategoryApiModel } from "./CategoryModel";

export const mapCategory = (item: CategoryApiModel) => {
  return {
    slug: item.slug,
    title: item.name,
    url: item.url,
  };
};