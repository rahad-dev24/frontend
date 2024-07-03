import { gql } from "@apollo/client";

export const BORROW_PRODUCT = gql`
  mutation CreateProductRentalHistory(
    $productId: String
    $lenterId: String
    $rentedPrice: Float
    $rentedAt: DateTime
    $returnedAt: DateTime
  ) {
    createProductRentalHistory(
      product_id: $productId
      lenter_id: $lenterId
      rented_price: $rentedPrice
      rentedAt: $rentedAt
      returnedAt: $returnedAt
    ) {
      id
    }
  }
`;
