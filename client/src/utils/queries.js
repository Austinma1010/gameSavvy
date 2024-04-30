import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query TrackedGame {
  me {
    trackedGame {
      title
    }
    username
  }
}
`;

// need query for searches