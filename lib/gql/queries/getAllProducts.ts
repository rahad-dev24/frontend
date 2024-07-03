import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      product_name
      description
      price
      createdAt
      rent_option
      rent_price
      user_id
      categories {
        id
        category_name
      }
    }
  }
`;
