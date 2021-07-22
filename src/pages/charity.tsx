import { CharityProfileFragmentDoc, useCharityQuery } from 'generated/graphql'

import Body from 'components/layout/Body'
import CharityEvents from 'components/charities/CharityEvents'
import CharityPost from 'components/charities/CharityPost'
import CharityProfile from 'components/charities/CharityProfile'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'
import withAuth from 'utils/withAuth'

export default withAuth(function Charity({ me }) {
  const router = useRouter()
  const { data } = useCharityQuery({
    variables: { charityId: parseInt(router.query.charityId as string) }
  })

  return (
    <Body title="Charity" me={me}>
      {data && data.charitySearchByID && (
        <>
          <CharityProfile
            charityProfile={filter(
              CharityProfileFragmentDoc,
              data.charitySearchByID
            )}
          />
          {data.charitySearchByID?.adminStatus && <CharityPost />}
          <CharityEvents events={data.charitySearchByID.charityEvents} />
        </>
      )}
    </Body>
  )
})
