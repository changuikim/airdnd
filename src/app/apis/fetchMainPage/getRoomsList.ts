async function getRoomsList(id, fields) {
  try {
    if (!id || !Array.isArray(fields) || fields.length === 0) {
      throw new Error('조회를 위한 파라미터가 적절하지 않습니다.')
    }

    // 숙소 DB에서 숙소 리스트에 포함되어야할 필드를 쿼리 스트링으로 결합힙니다.
    const queryParams = fields.map(field => `${field}=`).join('&')

    // 메인 페이지 렌더링에 필요한 정보 조회시 캐싱을 하지 않습니다.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/apis/fetchMainPage?id=${id}&${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

        // cache: 'no-store',
      },
    )

    if (!response.ok) {
      const headers = []
      response.headers.forEach((value, key) => {
        headers.push(`${key}: ${value}`)
      })

      const errorText = `메인 페이지 정보 조회 API에서 200 OK 응답을 받지 못했습니다. 
          상태 코드: ${response.status}, 
          상태 텍스트: ${response.statusText}, 
          Type: ${response.type}, 
          Redirected: ${response.redirected}, 
          Headers: ${headers.join(', ')}`

      throw new Error(errorText)
    }

    // 메인 페이지 렌더링에 필요한 정보를 역직렬화합니다.
    const records = await response.json()

    if (!records) {
      throw new Error('숙소 정보 조회 API에서 응답을 역직렬화하는데 실패했습니다.', records)
    }

    return records
  } catch (error) {
    throw new Error(error.message)
  }
}

export default getRoomsList
