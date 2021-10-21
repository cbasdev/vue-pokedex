/*
  Configuration needed to simulate an API in a development environment

  import ApiServiceFake from '@/common/bridges/fake'
  import { ENV } from '@/common/config'
  const service = ENV === 'development' ? ApiServiceFake : ApiServiceReal
*/

import ApiServiceReal from '@/common/bridges/real'

const service = ApiServiceReal

export default service
