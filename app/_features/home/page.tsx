'use client'
import Link from "next/link";
import Modal from "@/app/_components/Modal";
import { useState } from "react";
import { PlusIcon } from '@heroicons/react/20/solid'


export default function Home({ localPosts }: any) {
    const [open, setOpen] = useState(false)

    return (

        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">stockList</h1>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">


                        <button
                            onClick={() => setOpen(true)}

                            type="button"
                            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className=" text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Title
                                        </th>
                                        <th scope="col" className="text-left text-sm font-semibold text-gray-900">
                                            Url
                                        </th>
                                        <th scope="col" className="text-left text-sm font-semibold text-gray-900">
                                            Tags
                                        </th>
                                        <th scope="col" className="text-left text-sm font-semibold text-gray-900">
                                            Content
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {localPosts.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap text-sm font-medium text-gray-9000 sm:pl-0">
                                                {item.title}
                                            </td>
                                            <td className="whitespace-nowrap text-sm font-medium text-gray-900 sm:pl-0"><Link target="_blank" href={item.url}>{item.url}</Link></td>
                                            <td className="whitespace-nowrap text-sm font-medium text-gray-900 sm:pl-0">
                                                <ul className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag: any) => (
                                                        <li className="  text-white px-2 py-1 rounded-md" style={{ backgroundColor: tag.colorCode }} key={tag.name}>{tag.name}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="whitespace-nowrap text-sm text-gray-500">{item.content}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">Edit</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen} />
        </>

    )
}