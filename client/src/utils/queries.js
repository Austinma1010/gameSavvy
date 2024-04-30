import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query TrackedGames {
  me {
    trackedGames {
      title
    }
    username
  }
}
`;

