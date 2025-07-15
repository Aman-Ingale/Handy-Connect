"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function Page() {
    const [isViewMore, setIsViewMore] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const id = localStorage.getItem('id')
    const [job, setJob] = useState([{
    }]);
    async function handleAccept(reqId) {
        setAccepted(true)
        console.log(reqId)
        // const x = await fetch(`/api/request`, {
        //     method: 'PUT',
        //     body: JSON.stringify({_id:reqId,'status' : 'In Progress'}),
        // });
        // const result = await x.json();
        // console.log(result)
    }
    useEffect(() => {
        async function getAllProfessinals() {
            const x = await fetch(`/api/request/${id}?sender=provider`, {
                method: 'GET',
            });
            const result = await x.json();
            console.log(result)
            setJob(result);
        }
        getAllProfessinals()
    }, [])

    return (
        <div className="flex flex-col px-4 md:px-8 py-10 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Notifications</h1>
            <div className="flex flex-col gap-2">
                {job.map((job, index,_id) => (
                    <Card key={index} className="w-full hover:shadow-md transition-all duration-200 hover:scale-[1.005] p-3">
                        <div className="flex flex-col gap-2">
                            {/* Compressed header */}
                            <div className="flex justify-between items-center text-xs text-muted-foreground flex-wrap gap-x-2">
                                <span>2 days ago</span>
                                <h2 className="text-sm font-semibold">{job.jobtitle || "Job Title"}</h2>
                                <span className="flex items-center gap-1">
                                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                    <span className="text-red-500 font-medium">{job.status || "status"}</span>
                                </span>
                            </div>

                            {isViewMore && (
                                <CardContent className="p-0 pt-2 flex flex-col md:flex-row justify-between items-start gap-2 text-xs">
                                    <span className="flex flex-col gap-0.5 flex-1">
                                        <span><b>Location:</b> {job.location}</span>
                                        <span><b>Address:</b> {job.address}</span>
                                        <span className="line-clamp-2"><b>Description:</b> {job.description}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 self-start md:self-end">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback />
                                        </Avatar>
                                        <span className="text-xs font-medium">Aman Ingale</span>
                                    </span>
                                </CardContent>
                            )}

                            <CardFooter className="p-0 pt-2 flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-blue-600 hover:underline"
                                    onClick={() => setIsViewMore((prev) => !prev)}
                                >
                                    {isViewMore ? "View Less" : "View More"}
                                </Button>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="h-6 px-2 text-xs">Reject</Button>
                                    <Link href={`/api//${pro._id}`}>
                                    <Button size="sm" onClick={handleAccept} className="h-6 px-2 text-xs">Accept</Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </div>
                    </Card>



))}
            </div>
        </div>
    )
}

export default Page

// {/* {
//     !accepted &&
//     ( */}
//     {/* )
// } */}