import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query TrackedGames($token: String!) {
  me(token: $token) {
    trackedGames {
      title
    }
    username
  }
}
`;

