"use client";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
// import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  // If you are not using Calendar, you can remove this state:
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Calendar</h1>
        <p className="text-gray-500">View and manage your schedule</p>
      </div>

      <Card className="mb-6 p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <p className="text-gray-600">No events scheduled for today.</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <Button variant="outline">Today</Button>
          </div>
          <p className="text-gray-600 mb-4">Select a date to view events.</p>

          {/* Uncomment this only if you need it */}
          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          /> */}
        </Card>

        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Schedule a new event</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Event Title</Label>
                  <Input id="name" placeholder="Enter Event Title" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input id="description" placeholder="Enter Event Description" />
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="recurrence">Recurrence</Label>
                    <Select>
                      <SelectTrigger id="recurrence">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Schedule Event</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Page;
