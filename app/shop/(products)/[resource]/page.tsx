import { getMainNavigation } from "app/layout";
import Page from "../page";

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const { headerNavs } = await getMainNavigation()

//   return headerNavs.map(({ title: resource }) => ({
//     slug: resource
//   }))
// }

export default Page
