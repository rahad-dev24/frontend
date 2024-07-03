import { gql } from "@apollo/client";
export const BOUGHT_PRODUCTS = gql`
  query GetProductTransactionHistoryByBuyerId {
    getProductTransactionHistoryByBuyerId {
      product {
        categories {
          category_name
          id
        }
        createdAt
        description
        id
        price
        product_name
        rent_option
        rent_price
      }
    }
  }
`;
