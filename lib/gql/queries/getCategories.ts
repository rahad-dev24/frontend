import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      category_name
      id
    }
  }
`;
