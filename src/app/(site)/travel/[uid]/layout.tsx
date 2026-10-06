import Script from 'next/script'
 
export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c864604d-4bcb-4b58-a3a7-a4c8bca7b0a1" async />
    </>
  )
}
      