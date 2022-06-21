import { Drawer } from '~/components/atoms/drawer/drawer'

export default function InvoicesNewRoute() {
  return <Drawer open={true}>Hello new invoice</Drawer>

  // return (
  //   <>
  //     <div className="absolute inset-0 bg-green-300 p-8 pt-[calc(74px_+_2rem)] lg:pl-[calc(104px_+_2rem)] lg:pt-8">
  //       Drawer Content with a lot of text Lorem, ipsum.
  //     </div>
  //   </>
  // )
}
