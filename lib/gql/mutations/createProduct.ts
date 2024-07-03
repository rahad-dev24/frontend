import { gql } from "@apollo/client";
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String
    $description: String
    $price: Float
    $rentPrice: Float
    $rentOption: String
    $categories: [String]
  ) {
    createProduct(
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
