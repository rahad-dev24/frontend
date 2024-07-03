import { gql } from "@apollo/client";

export const BORROWED_PRODUCTS = gql`
  query GetProductRentalHistoryByBorrowerId {
    getProductRentalHistoryByBorrowerId {
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
