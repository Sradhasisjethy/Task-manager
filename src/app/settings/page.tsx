import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
const settingspage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-gray-500">Manage your account settings</p>
      </div>

      <div className='display flex justify-center items-center mt-7'>
        <Tabs defaultValue="account" className="w-[700px] bg-[#0b102c] text-white p-4 rounded ">
          <TabsList className="grid w-full grid-cols-2 bg-[#0b102c] text-white border border-gray-700 rounded mb-4">
        <TabsTrigger value="account" className="text-white data-[state=active]:bg-[#0d6efd]">Account</TabsTrigger>
        <TabsTrigger value="password" className="text-white data-[state=active]:bg-[#0d6efd]">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
        <Card className='bg-[#0b102c]' >
          <CardHeader >
            <CardTitle className=' text-white'>Account</CardTitle>
            <CardDescription>
          Make changes to your account here. Click save when youre done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-white">
            <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="User Name" />
            </div>
            <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="Username or Email" />
            </div>
          </CardContent>
          <CardFooter className='hover-bg'>
            <Button className="hover:bg-[#0d6efd] hover:text-white">Save changes</Button>
          </CardFooter>
        </Card>
          </TabsContent>
          <TabsContent value="password">
        <Card  className='bg-[#0b102c]'>
          <CardHeader>
            <CardTitle className='text-white'>Password</CardTitle>
            <CardDescription>
          Change your password here. After saving, you ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-white">
            <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter >
          <Button className="hover:bg-[#0d6efd] hover:text-white">Save password</Button>
          </CardFooter>
        </Card>
          </TabsContent>
        </Tabs>
      </div>
      

    </DashboardLayout>
  )
}

export default settingspage
