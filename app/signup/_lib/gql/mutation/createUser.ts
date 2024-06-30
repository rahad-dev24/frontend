import { gql } from "@apollo/client";
export const create_user = gql`
  mutation CreateUser(
    $first_name: String
    $last_name: String
    $phone: String
    $email: String
    $address: String
    $password: String
  ) {
    createUser(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      address: $address
      password: $password
    ) {
      id
    }
  }
`;
