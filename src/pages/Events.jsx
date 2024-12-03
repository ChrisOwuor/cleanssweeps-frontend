import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import List from "@/widgets/cards/list";
import Filter from "@/widgets/layout/filter";
import { useAuth } from "@/contexts/authContext";

export function Events() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/event`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token from useAuth for Authorization
            },
          }
        );
        setEvents(response.data); // Assuming the API returns an array of events
      } catch (err) {
        setError("Failed to fetch events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]); // Only refetch if the token changes

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative flex h-max content-center items-center justify-center pt-16 pb-8">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Get Involved in Our Events
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Explore our upcoming events and stay updated on the latest
                activities. From workshops to networking opportunities, there's
                something for everyone!
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <Filter events={events} />

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
                <Typography variant="lead">{event.description}</Typography>
                <Button className="mt-4">RSVP</Button>
              </CardBody>
            </Card>
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Events;
