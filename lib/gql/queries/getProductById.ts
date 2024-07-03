import { gql } from "@apollo/client";
export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      categories {
        id
        category_name
      }
      description
      id
      price
      product_name
      rent_option
      rent_price
    }
  }
`;
