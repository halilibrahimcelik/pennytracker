import Carousel from "@/components/features/Carousel";
import DotGrid from "@/components/features/DotGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import Typography from "@/components/ui/typogprahy";
import Link from "next/dist/client/link";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Container className="pt-44">
        <Typography variant="h1" textAlign="center">
          Welcome to Penny Tracker <br />
        </Typography>
        <div className="flex items-center justify-center">
          <Card className="max-w-3xl mt-10 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle>
                <Typography variant="h3">
                  Get started by exploring our dashboard
                </Typography>
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="">
                <Typography variant="p" className="text-wrap   pt-7">
                  Use the dashboard to monitor your financial activities, write
                  down your expenses and incomes,and gain insights into your
                  spending habits.
                </Typography>
                <hr className="my-4" />
                <Button className="w-full md:w-auto">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
              <div className=" flex-1  flex items-center justify-center">
                <Image
                  src="monitor-chart.svg"
                  alt="Monitor Chart"
                  width={400}
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Carousel loop autoplay />
        </div>
      </Container>
    </>
  );
}
