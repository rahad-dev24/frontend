import { gql } from "@apollo/client";
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String
    $description: String
    $price: Float
    $rentPrice: Float
    $rentOption: String
    $productCategory: [String]
  ) {
    createProduct(
      product_name: $productName
      description: $description
      price: $price
      rent_price: $rentPrice
      rent_option: $rentOption
      product_category: $productCategory
    ) {
      id
    }
  }
`;
