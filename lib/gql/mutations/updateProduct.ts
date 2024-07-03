import { gql } from "@apollo/client";
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $updateProductId: ID!
    $productName: String
    $description: String
    $price: Float
    $rentPrice: Float
    $rentOption: String
    $categories: [String]
  ) {
    updateProduct(
      id: $updateProductId
      product_name: $productName
      description: $description
      price: $price
      rent_price: $rentPrice
      rent_option: $rentOption
      categories: $categories
    ) {
      id
    }
  }
`;
