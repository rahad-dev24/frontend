import { gql } from "@apollo/client";
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String
    $description: String
    $price: Float
    $rentPrice: Float
    $productCategory: [String]
  ) {
    createProduct(
      product_name: $productName
      description: $description
      price: $price
      rent_price: $rentPrice
      product_category: $productCategory
    ) {
      id
    }
  }
`;
