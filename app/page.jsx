import Landing from "../components/Landing";
import Coffees from "@/components/Home/Coffees/Coffees";
import Shop from "@/components/Home/Shop/Shop";
import Menu from "@/components/Home/Explore/Menu";
import Exploreabout from "@/components/Home/Exploreabout/Exploreabout";
import Stories from "@/components/Home/Stories/Stories";
export default function Page() {
  return (
    <>
      <Landing />
      <Coffees />
      <Shop />
      <Menu />

      <Exploreabout />
      <Stories />
    </>
  );
}
