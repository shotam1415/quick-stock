'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { registerPost } from '@/app/_features/home/action';
import { useFormState } from "react-dom";
import { Button } from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'


export default function Modal() {
    const initialState = {
        errors: {},
        message: "",
    };
    const searchParams = useSearchParams();
    const result = searchParams.get("result");
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ogp, setOgp] = useState('')
    const [lastResult, action] = useFormState(registerPost, initialState);
    const router = useRouter();


    const fetchMetaData = async () => {
        try {
            const response = await fetch(
                `/api/open-graph?url=${encodeURIComponent(url)}`,
                {
                    cache: 'force-cache',
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const { title, description, ogp } = await response.json();
            if (title) setTitle(title);
            if (description) setDescription(description);
            if (ogp) setOgp(ogp);
        } catch (error) {
            console.error("Error fetching metadata:", error);
        }
    };


    const clearForm = () => {
        setUrl('');
        setTitle('');
        setDescription('');
        setOgp('');
        router.push("/");
        router.refresh();
    }

    return (
        <div className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Stock successful
                                </DialogTitle>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => clearForm()}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>


                    </DialogPanel>
                </div>
            </div>
        </div>
    )
}
