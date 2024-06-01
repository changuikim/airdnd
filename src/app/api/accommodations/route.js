import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // 1 데이베이스 역할의 JSON 파일을 fetch로 가져온다.
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/Accommodation.json`)

    if (!response.ok) {
      throw new Error('Failed to fetch accommodation data')
    }

    const data = await response.json()

    const accommodations = data.accommodationInfo

    if (!Array.isArray(accommodations)) {
      throw new Error('Invalid accommodation data format')
    }

    // 2 데이터베이스 연산 작업을 모의로 수행한다.
    /*
    SELECT
            accommodationId, accommodationName, imageUrl
    FROM
            accommodation_info 
    */
    const accommodationInfo = accommodations.map(accommodation => ({
      accommodationId: accommodation.accommodationId,
      accommodationName: accommodation.accommodationName,
      imageUrl: accommodation.imageUrl[0],
    }))

    // 3 클라이언트에게 JSON 형식으로 응답한다.
    return NextResponse.json(accommodationInfo, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 4 에러가 발생하면 클라이언트에게 에러 메시지를 응답한다.
  } catch (error) {
    console.error('Error fetching accommodations:', error)
    return NextResponse.json({ error: 'Failed to fetch accommodation data' }, { status: 500 })
  }
}