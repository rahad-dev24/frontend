import { gql } from "@apollo/client";
export const get_products_by_user = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      products {
        id
        product_name
        description
        product_category {
          category {
            category_name
          }
        }
        rent_price
        rent_option
        price
        created_at
      }
    }
  }
`;
