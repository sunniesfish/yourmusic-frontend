"use client";
import { useMemo } from "react";

/**
 * Removes __typename field from GraphQL data
 * @template T - Type of the data to sanitize
 * @param data - GraphQL data containing __typename fields
 * @returns Sanitized data without __typename fields
 */
export const useSanitizedData = <T>(data: T): T => {
  return useMemo(() => {
    const cache = new WeakMap<object, any>();

    const deepOmitTypename = (value: any): any => {
      if (value === null || typeof value !== "object") {
        return value;
      }

      if (cache.has(value)) {
        return cache.get(value);
      }

      let result: any;
      if (Array.isArray(value)) {
        result = value.map(deepOmitTypename);
      } else {
        result = Object.fromEntries(
          Object.entries(value)
            .filter(([key]) => key !== "__typename")
            .map(([key, val]) => [key, deepOmitTypename(val)])
        );
      }

      cache.set(value, result);
      return result;
    };

    return deepOmitTypename(data) as T;
  }, [data]);
};
