import { GraphQLResult } from '@aws-amplify/api-graphql'
import { createRecordTime } from '@graphqlMutations'
import { recordTimeByFastest } from '@graphqlQueries'
import { API, graphqlOperation } from 'aws-amplify'
import { RecordTime, RecordTimeByFastestQuery } from '../API'

export const fetchRecordTimes = async (): Promise<RecordTime[]> => {
  const results = (await API.graphql(
    graphqlOperation(recordTimeByFastest, {
      type: 'RecordTime',
      sortDirection: 'ASC',
      limit: 5,
    }),
  )) as GraphQLResult<RecordTimeByFastestQuery>
  const items = results.data?.recordTimeByFastest?.items
  return items as RecordTime[]
}

export const saveRecordTime = async ({
  time,
  name,
}: {
  time: number
  name: string
}) => {
  const newRecordTime = await API.graphql({
    query: createRecordTime,
    variables: { input: { name, time, type: 'RecordTime' } },
  })
  console.log('new record saved', newRecordTime)
}
