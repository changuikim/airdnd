import Image from 'next/image'

function HostIntro({ hostLanguage, hostLocation, hostDescription }) {
  return (
    <div className="mt-[1.2rem] ">
      <div className="flex flex-row mb-[0.5rem] ">
        {hostLanguage && (
          <>
            <Image alt={'HostLanguage'} src={`/images/HostLanguage.svg`} width={1} height={1} />
            <div className="ml-[0.3rem] text-sm text-left">구사 언어: {hostLanguage}</div>
          </>
        )}
      </div>

      {hostLocation && (
        <>
          <div className="flex flex-row ">
            <Image alt={'HostLocation'} src={`/images/HostLocation.svg`} width={24} height={24} />
            <div className="ml-[0.3rem] text-sm text-left ">거주지: {hostLocation}</div>
          </div>
        </>
      )}

      {hostDescription ? <div className="mt-[1rem] text-left text-sm w-full">{hostDescription}...</div> : null}

      <div className="mt-[0.5rem] flex flex-row">
        <div className="text-sm font-bold text-left underline">더 보기</div>
        <Image alt={'DescriptionDetail'} src={`/images/DescriptionDetail.svg`} width={18} height={18} />
      </div>
    </div>
  )
}

export default HostIntro
