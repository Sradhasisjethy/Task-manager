"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
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

type Event = {
  title: string;
  description?: string;
  date: Date;
  recurrence: string;
  priority: string;
};

const Page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [priority, setPriority] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newEvent: Event = {
      title,
      description,
      date,
      recurrence,
      priority,
    };

    setEvents([...events, newEvent]);
    // Clear form
    setTitle("");
    setDescription("");
    setRecurrence("");
    setPriority("");
    setDate(new Date());
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Calendar</h1>
        <p className="text-gray-500">View and manage your schedule</p>
      </div>

      <Card className="mb-6 p-4 shadow-md bg-[#0b102c] text-white border-[#0b102c]">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-600">No events scheduled for today.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li key={index} className="text-sm">
                <strong>{event.title}</strong> —{" "}
                {event.date.toLocaleDateString()} ({event.priority})
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#0b102c] text-white border-[#0b102c] p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <Button onClick={() => setDate(new Date())} className="bg-[#0d6efd]">
              Today
            </Button>
          </div>
          <p className="text-gray-400 mb-4">Select a date to view events.</p>
          <div className="flex justify-center items-center mb-7 rounded">
          <Calendar className="bg-gradient-to-t  from-indigo-500 to-[#100d22]" mode="single" selected={date} onSelect={setDate} />
          </div>
        </Card>

        <Card className="w-full bg-[#0b102c] text-white border-[#0b102c]">
          <CardHeader>
            <CardTitle>Schedule a new event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Event Title</Label>
                  <Input
                    id="name"
                    placeholder="Enter Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="Enter Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="recurrence">Recurrence</Label>
                    <Select value={recurrence} onValueChange={setRecurrence}>
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
                    <Select value={priority} onValueChange={setPriority}>
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
              <CardFooter className="flex justify-between mt-4 p-0">
                <Button type="button" variant="ghost" onClick={() => {
                  setTitle("");
                  setDescription("");
                  setRecurrence("");
                  setPriority("");
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0d6efd]">Schedule Event</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Page;
