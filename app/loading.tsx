export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
    </div>
}