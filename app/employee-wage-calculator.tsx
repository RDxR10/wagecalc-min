'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, DollarSign, Briefcase, UserCheck } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts'

export default function FullScreenEmployeeWageCalculator() {
  const [name, setName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [hoursWorked, setHoursWorked] = useState(0)
  const [hoursLogged, setHoursLogged] = useState(0)
  const [rate, setRate] = useState(15)
  const [approvedByManager, setApprovedByManager] = useState('no')
  const [totalWage, setTotalWage] = useState(0)

  const hourlyRates = [15.88, 16.51, 26.34, 30, 32.65, 40.48, 47.20, 53.71]

  const calculateOvertimeHours = () => Math.max(hoursLogged - hoursWorked, 0)
  const calculateWage = () => hoursLogged * rate

  useEffect(() => {
    setTotalWage(calculateWage())
  }, [hoursLogged, hoursWorked, rate])

  const generateReport = () => {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Wage Report</h3>
        <p>Employee Name: {name}</p>
        <p>Project Name: {projectName}</p>
        <p>Hours Worked: {hoursWorked}</p>
        <p>Hours Logged: {hoursLogged}</p>
        <p>Overtime Hours: {calculateOvertimeHours()}</p>
        <p>Hourly Rate: ${rate}</p>
        <p className="font-bold">Total Wage: ${totalWage.toFixed(2)}</p>
      </div>
    )
  }

  const hoursData = [
    { name: 'Hours Worked', value: hoursWorked },
    { name: 'Hours Logged', value: hoursLogged },
  ]

  const overtimeData = [
    { name: 'Regular Hours', value: hoursWorked },
    { name: 'Overtime Hours', value: calculateOvertimeHours() },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180)
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180)
  
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background p-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Employee Wage Calculator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Input Details</CardTitle>
              <CardDescription>Enter employee work details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Employee Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter employee name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="hours-logged">Hours Logged</Label>
                 <Input
                  id="hours-logged"
                  type="number"
                  min="0"
                  value={hoursLogged}
                  onChange={(e) => setHoursLogged(Number(e.target.value))}
                 />
               </div>
               <div className="space-y-2">
                <Label htmlFor="hours-worked">Hours Worked</Label>
                 <Input
                  id="hours-worked"
                  type="number"
                  min="0"
                  max={hoursLogged}
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(Number(e.target.value))}
                 />
               </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Hourly Rate</Label>
                  <Select value={rate.toString()} onValueChange={(value) => setRate(Number(value))}>
                    <SelectTrigger id="rate">
                      <SelectValue placeholder="Select hourly rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {hourlyRates.map((rate) => (
                        <SelectItem key={rate} value={rate.toString()}>
                          ${rate}/hour
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approved">Approved by Project Manager</Label>
                  <Select value={approvedByManager} onValueChange={setApprovedByManager}>
                    <SelectTrigger id="approved">
                      <SelectValue placeholder="Select approval status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start space-y-4">
              {approvedByManager === 'yes' && generateReport()}
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wage Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Wage</span>
                  </div>
                  <span className="text-2xl font-bold">${totalWage.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hourly Rate</span>
                    <span className="font-medium">${rate}/hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Hours</span>
                    <span className="font-medium">{hoursLogged} hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Employee</span>
                    </div>
                    <span>{name || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Project</span>
                    </div>
                    <span>{projectName || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Manager Approval</span>
                    </div>
                    <span className={approvedByManager === 'yes' ? 'text-green-600' : 'text-red-600'}>
                      {approvedByManager === 'yes' ? 'Approved' : 'Not Approved'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hours Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hoursData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Overtime Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overtimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {overtimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
