import { gql, useQuery } from '@apollo/client'

import isServer from 'utils/isServer'

export const ME = gql`
  query Me {
    me {
      id
      username
      adminCharities {
        id
        name
      }
    }
  }
`

export default function useMeQuery() {
  return useQuery(ME, {
    skip: isServer()
  })
}
