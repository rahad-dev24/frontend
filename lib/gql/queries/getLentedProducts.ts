import { gql } from "@apollo/client";

export const LENTED_PRODUCTS = gql`
  query GetProductRentalHistoryByLenterId {
    getProductRentalHistoryByLenterId {
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
