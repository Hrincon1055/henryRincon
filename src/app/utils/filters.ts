type TypeFilterProperty = {
  filters: any;
  filterKey: string;
  tempList: any[];
  tempListProperty: string;
};
export function byStringProperty({
  filters,
  filterKey,
  tempList,
  tempListProperty,
}: TypeFilterProperty) {
  const filterValues = filters[filterKey]?.toString().toLowerCase().trim();

  if (!filterValues) {
    return tempList;
  }

  return tempList.filter((item) => {
    const propertyValue = item[tempListProperty]
      ?.toString()
      .toLowerCase()
      .trim();
    return propertyValue?.includes(filterValues);
  });
}
