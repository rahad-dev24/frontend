import { gql } from "@apollo/client";

export const SOLD_PRODUCTS = gql`
  query GetProductTransactionHistoryBySellerId {
    getProductTransactionHistoryBySellerId {
      product {
        categories {
          id
          category_name
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
