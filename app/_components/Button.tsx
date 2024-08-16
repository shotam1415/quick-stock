import { useFormStatus } from "react-dom";


export function Button() {
    // 📌 Form 送信中は pending: true になる
    const { pending } = useFormStatus();
    return (
        <>
            {!pending ? (
                <button
                    disabled={pending}
                    className="disabled:opacity-50 rounded-md mx-auto flex justify-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Stock
                </button>
            ) : (
                <div className="flex justify-center" aria-label="読み込み中">
                    <div className="animate-spin h-5 w-5 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
                </div>
            )}
        </>
    );
}