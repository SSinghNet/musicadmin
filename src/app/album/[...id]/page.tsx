import Image from "next/image";
import { notFound } from "next/navigation";

let json1 = async (id: Number) => {
    return await fetch("https://music.ssingh.net/album/" + id + "?format=json")
        .then((response) => {
            if (response.status == 404) {
                return 404;
            }
            return response.json();
        });
};

export default async function Page({ params }: { params: { id: Number } }) {
    let data = await json1(params.id); 
    if (data == 404) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>album {params.id.toString()}</h1>
            <p>Id: {data["id"]}</p>
            <p>Name: {data["name"]}</p>
            <p>Image: {data["image"]} <Image src={data["image"]} alt="" width={200} height={200} /></p>
            <p>Release Date: {data["releaseDate"]}</p>
            <p>Score: {data["score"]}</p>
            <p>Review: {data["review"]}</p>
            <p>
                Artists:&nbsp;
                {data["artists"].map((artist: { [x: string]: any; }) => { 
                    return artist["id"] + artist["name"] + artist["image"];
                })}
            </p>
            <p>
                Tags:&nbsp;
                {data["tags"].map((tag: { [x: string]: any; }) => { 
                    return tag["id"] + tag["name"] + tag["color"];
                })}
            </p>
        </main>
    );
}