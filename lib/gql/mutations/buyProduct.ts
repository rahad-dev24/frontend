import { gql } from "@apollo/client";

export const BUY_PRODUCT = gql`
  mutation CreateProductTransactionHistory(
    $productId: String
    $sellerId: String
  ) {
    createProductTransactionHistory(
      product_id: $productId
      seller_id: $sellerId
    ) {
      id
    }
  }
`;
