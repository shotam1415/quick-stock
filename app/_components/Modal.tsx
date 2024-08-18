'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { registerPost } from '@/app/_features/home/action';
import { useFormState } from "react-dom";
import { Button } from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PlusIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { type Id, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Modal({ showModal, setShowModal, localTags }: { showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, localTags: any }) {

    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const modalType = searchParams.get("modal-type");
    const modalResult = searchParams.get("modal-result");

    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ogp, setOgp] = useState('')
    const [tags, setTags] = useState([""])
    const initialToastId = '' as Id;
    const initialState = { type: 'default' };
    const [state, action] = useFormState(registerPost, initialState);
    const router = useRouter();

    /* useEffect added */
    useEffect(() => {
        if (state.type === 'success') {
            toast.success('success');
            clearForm()
        } else if (state.type === 'error') {
            toast.error('error');
        }

        state.type = initialState.type;
    }, [state]);

    // const handleSubmitForm = (formData: FormData) => {
    //     state.toastId = toast.loading('Loading...');
    //     action();
    // };

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
        setShowModal(false)
        setUrl('');
        setTitle('');
        setDescription('');
        setOgp('');
        setTags([""])
    }
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }




    return (
        <>
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
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
                                <div className="mt-3 sm:mt-5">
                                    <form className='' action={action} >
                                        <div className='mb-4'>
                                            <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                                                URL
                                            </label>
                                            <div className="mt-1 flex items-center gap-x-2">
                                                <input
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    value={url}
                                                    id="url"
                                                    name="url"
                                                    type="url"
                                                    placeholder="https://example.com"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-3000 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <button
                                                    onClick={() => fetchMetaData()}
                                                    type="button"
                                                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    Check
                                                </button>
                                            </div>
                                        </div>
                                        <input type="hidden" name="title" value={title} />
                                        <input type="hidden" name="description" value={description} />
                                        <input type="hidden" name="ogp" value={ogp} />
                                        <input type="hidden" name="tags" value={tags} />


                                        {title && ogp && (
                                            <>
                                                <div className='flex flex-col gap-y-4 mb-2'>
                                                    <div className=' gap-y-2 border border-gray-200 rounded-md'>
                                                        <img src={ogp} alt="" className='w-full h-40 object-cover' />
                                                        <dl className='p-2'>
                                                            <dt className='font-bold text-sm'>{title}</dt>
                                                            <dd className='text-sm'>{description}</dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <label htmlFor="tags" className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                                                        Tags
                                                    </label>
                                                    <div className='flex flex-col gap-y-2'>
                                                        {tags.map((item, index) => {
                                                            return (
                                                                <div className='flex items-center gap-x-2' key={index}>
                                                                    <select
                                                                        onChange={(e) => {
                                                                            const newTags = [...tags];
                                                                            newTags[index] = e.target.value;
                                                                            setTags(newTags);
                                                                        }}
                                                                        required
                                                                        key={index}
                                                                        defaultValue={item}
                                                                        id="tags"
                                                                        name="tags"
                                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    >
                                                                        <option value={""} hidden></option>
                                                                        {localTags.map((tag: any) => (
                                                                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    <button type='button' className={clsx(' text-gray-600', index === 0 && ' pointer-events-none text-gray-100')} onClick={() => {
                                                                        const newTags = [...tags];
                                                                        newTags.splice(index, 1);
                                                                        setTags(newTags);
                                                                    }}>
                                                                        <XCircleIcon aria-hidden="true" className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            )

                                                        })}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="rounded-full mx-auto block mt-2 bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5" onClick={() => setTags([...tags, ""])} />
                                                    </button>
                                                </div>
                                                <Button />

                                            </>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div >

            </Dialog >
            <ToastContainer />

        </>
    )
}
