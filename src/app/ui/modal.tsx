'use client'
import { useState } from "react";

const addAlbum = async (body : any) => {
    await fetch("https://music-ssingh.onrender.com/album/", {
        method: "POST",
        body: JSON.stringify(
            body
        ),
        headers: {
            "Token": `${process.env.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/json"
        }
    }).then((response) => {
        console.log(response.text());
    });
}

const uploadImage = async (image: String) => {
    let key = "";
    await fetch("https://music-ssingh.onrender.com/img", {
        method: "POST",
        body: JSON.stringify({
            "key": Date.now().toString(),
            "url": image
        }),
        headers: {
            "Token": `${process.env.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        key = (await response.text()).replace("Success: ", "");
    });

    return key;
}

export default function Modal(props: any) {

    const [modal, setModal] = useState(false);

    const [albName, setAlbName] = useState("");
    const [image, setImage] = useState("");
    const [artists, setArtists] = useState("");
    const [score, setScore] = useState("");
    const [date, setDate] = useState("2024-01-01");
    const [review, setReview] = useState("");
    const [tags, setTags] = useState("");

    const createBody = async (event : any) => {
        event.preventDefault();

        let artistsList = artists.split(",");
        let artistsBody: any[] = [];

        artistsList.forEach(art => {
            artistsBody.push({"name": art});
        });

        let tagsList = tags.split(",");
        let tagsBody: any[] = [];

        tagsList.forEach(tag => {
            tagsBody.push({"name": tag.trim()});
        });

        let body = {
            "name": albName,
            "image": "https://music.ssingh.net/img?key=" + await uploadImage(image),
            "artists": artistsBody,
            "score": score,
            "releaseDate": date,
            "review": review,
            "tags": tagsBody
        }

        addAlbum(body);
        alert("nice");
        setModal(false);
    };

    return <>
        <button className="p-3 m-1 bg-slate-600" id="openModal" onClick={() => setModal(true)}>
            New Album
        </button>
        <dialog open={modal} className="p-5 w-5/6 bg-slate-800 text-white">
            <button className="p-1 m-1 bg-slate-600" id="openModal" onClick={() => setModal(false)}>
                close
            </button>
            <form onSubmit={createBody}>
                <label htmlFor="albName">Name: </label>
                <input
                    type="text"
                    name="albName"
                    id="albName"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={albName}
                    onChange={(e) => setAlbName(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="image">Image: </label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="bg-transparent border text-wrap rounded p-1" />
                <br />

                <label htmlFor="artists">Artists (comma separated): </label>
                <input
                    type="text"
                    name="artists"
                    id="artists"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={artists}
                    onChange={(e) => setArtists(e.target.value)}
                    required />
                <br />

                <label htmlFor="score">Score: </label>
                <input
                    type="text"
                    name="score"
                    id="score"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required />
                <br />

                <label htmlFor="date">Release Date: </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required />
                <br />

                <label htmlFor="review">Review: </label>
                <input
                    type="textarea"
                    name="review"
                    id="review"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <br />

                <label htmlFor="tags">Tags (comma separated): </label>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    className="bg-transparent border text-wrap rounded p-1"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required />
                <br />

                <input type="submit" value="Add" className="p-1 m-1 bg-slate-600" />
            </form>
        </dialog>
    </>;
}