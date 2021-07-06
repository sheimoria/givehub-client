import { GraphQLResponse, Network } from 'relay-runtime'

import fetchGraphQL from 'utils/fetchGraphQL'
import { withHydrateDatetime } from 'relay-nextjs/date'

export function createServerNetwork() {
  return Network.create(async (text, variables) => {
    const results = await fetchGraphQL(text, variables)

    const data = JSON.parse(
      JSON.stringify(results),
      withHydrateDatetime
    ) as GraphQLResponse

    return data
  })
}
