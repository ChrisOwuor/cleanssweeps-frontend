import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import List from "../cards/list";

const filters = [
  {
    id: "ongoing",
    name: "Ongoing",
  },
  {
    id: "upcoming",
    name: "Upcoming",
  },
  {
    id: "endend",
    name: "Endend",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter({events}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Events
            </h1>

            <div className="flex items-center">
              <p>Search</p>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden  lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                      </DisclosureButton>
                    </h3>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* <List /> */}
                <div className="bg-white">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <Card key={event._id} className="mb-6">
                        <CardHeader
                          floated={false}
                          color="blue"
                          className="relative h-56"
                        >
                          <Typography
                            variant="h4"
                            color="white"
                            className="absolute top-4 left-4"
                          >
                            {event.title}
                          </Typography>
                        </CardHeader>
                        <CardBody>
                          <Typography variant="lead">
                            {event.description}
                          </Typography>
                          <Button className="mt-4">RSVP</Button>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <div>No events found</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
