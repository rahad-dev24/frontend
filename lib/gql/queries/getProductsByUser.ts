import { gql } from "@apollo/client";
export const GET_PRODUCTS_BY_USER = gql`
  query GetProducts_by_user($userId: ID!) {
    getProducts_by_user(user_id: $userId) {
      id
      description
      createdAt
      price
      product_name
      rent_option
      rent_price
      categories {
        id
      }
    }
  }
`;
