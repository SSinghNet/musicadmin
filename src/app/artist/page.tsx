'use server'
import Link from "next/link";
import ArtistElement from "../ui/artistElement";
import { revalidateTag } from 'next/cache';

let json1 = async (page: Number): Promise<any> => {
    // const { signal } = new AbortController();

    return await fetch("https://music-ssingh.onrender.com/artist?format=json&page=" + page, { next: { revalidate: 0,  tags:  ['artists']}} )
        .then((response) => {
            if (response.status == 404) {
                return json1(0);
            }
            return response.json();
        }).catch(() => {
            return json1(0);
        });
};

export default async function Page({ searchParams }: { searchParams: { page: Number | Number } }) {
    let page = searchParams.page != null ? searchParams.page : 0;

    let data = await json1(searchParams.page);

    let modal = false;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
            <h1>artists</h1>
            <div className="inline-flex">
                <Link href={"/artist?page=" + (Number(page) - 1)} className="p-2 rounded-l bg-slate-600">
                    &lt;
                </Link>
                <Link href={"/artist?page=" + (Number(page) + 1)} className="p-2 rounded-r bg-slate-600">
                    &gt;
                </Link>
            </div>


            <div className="table-fixed border border-separate border-slate-700 w-full">
                <div className="flex items-center py-3 text-lg border-t border-b px-4">
                    <h2 className="w-1/4 font-bold text-sm text-center">id</h2>
                    <h2 className="w-1/4 font-bold text-sm text-center">name</h2>
                    <h2 className="w-1/4 font-bold text-sm text-center">image</h2>
                    <h2 className="w-1/4 font-bold text-sm text-center">image preview</h2>
                </div>
                {
                    data.map((artist: { [x: string]: any; }) => {
                        return (
                            <ArtistElement key={artist["id"]} data={artist} />
                        );
                    })
                }
            </div>
        </main>
    );
}