import React from "react";
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
import workers from "../assets/pexels-thirdman-7656743.jpg";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Together, We Build Stronger Communities
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Welcome to our community app, the hub for connecting,
                collaborating, and making a positive impact. Whether you're here
                to organize events, join local initiatives, or find like-minded
                people, this is your platform to bring ideas to life and
                strengthen bonds. Let’s work together to create vibrant,
                engaged, and thriving communities!
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Building Communities, Changing Lives
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Join hands with neighbors and like-minded individuals to make a
                positive impact in your community. From organizing clean-up
                drives to hosting impactful events, our platform helps you take
                the first step toward creating a better world. Together, we
                achieve more.
                <br />
                <br />
                Whether you’re looking to collaborate on a project or find local
                volunteering opportunities, our app is here to help you connect,
                organize, and grow. Let’s bring ideas to life and foster
                thriving communities.
              </Typography>
              <Button variant="filled">Learn More</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src={workers}
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Community Impact
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Empowering Local Initiatives
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    With our app, you can discover projects in need of support,
                    recruit volunteers, and celebrate milestones together. Let’s
                    turn ideas into action and make lasting change in our
                    communities.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle
            section="Community Action"
            heading="Join Us to Make a Difference"
          >
            Our platform connects individuals and organizations to take
            meaningful action in their communities. From organizing events to
            driving impactful initiatives, we’re here to support your vision for
            a better tomorrow.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Get in Touch" heading="Let’s Work Together">
            Have an idea for a community initiative or want to collaborate with
            us? Fill out the form below, and we’ll get back to you within 24
            hours.
          </PageTitle>
          <form  id="get_in_touch" className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Your Name" />
              <Input variant="outlined" size="lg" label="Your Email" />
            </div>
            <Textarea
              variant="outlined"
              size="lg"
              label="Your Message"
              placeholder="Tell us how we can help or collaborate..."
              rows={8}
            />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
