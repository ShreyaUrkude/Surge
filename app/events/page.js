import Bookevents from './_components/Bookevent/Bookevent';
import Coffeepackage from './_components/Coffeepackage/Coffeepackage';
import Addone from './_components/Addone/Addone';
import Enquire from './_components/Enquire/Enquire';
export default function BookeventPage() {
  return (
    <main>
      <Bookevents />
      <Coffeepackage/>
      <Addone />
      <Enquire />
    </main>
  );
}