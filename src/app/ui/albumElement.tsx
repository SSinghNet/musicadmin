'use client'
import Image from "next/image";
import Link from "next/link";
import EasyEdit, { Types } from "react-easy-edit";

const DisplayComponent = (props: any) => {
    return (<>
        {props.value}
    </>);
};
const EditComponent = (props: any) => {
    return (<>
        <textarea
            // type="textarea"
            className="bg-transparent border text-wrap rounded p-1"
            value={props.value}
            onChange={(event) => {
                props.setParentValue(event.target.value);
            }}
        />
    </>);
};

const DateEditComponent = (props: any) => {
    return (<>
        <input
            type="date"
            className="bg-transparent border text-wrap rounded p-1 w-40"
            value={props.value}
            onChange={(event) => {
                props.setParentValue(event.target.value);
            }}
        />
    </>);
}

const updateAlbum = async (id: Number, body: any) => {
    await fetch("https://music.ssingh.net/album/" + id, {
        method: "PUT",
        body: JSON.stringify(
            body
        ),
        headers: {
            "Token": `${process.env.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/json"
        }
    }).then((response) => {
        // console.log(response.text());
    });
};

export default function AlbumElement(props: any) {
    return (
        // <Link href={"/album/" + props.data["id"]}>
        <div className="flex items-center py-3 text-lg border-t border-b px-4">
            <h2 className="w-1/12 text-sm p-1">
                <br />
                {props.data["id"]}
            </h2>
            <h2 className="w-2/12 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={(name: any) => { updateAlbum(props.data["id"], { "name": name }); }}
                    onCancel={() => { }}
                    value={props.data["name"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-2/12 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={() => { }}
                    onCancel={() => { }}
                    value={props.data["image"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-2/12 text-sm p-1">
                <Image src={props.data["image"]} width={50} height={50} alt="" />
            </h2>
            <h2 className="w-2/12 text-sm p-1">
                <EasyEdit
                    type={Types.DATE}
                    onSave={(date: any) => { updateAlbum(props.data["id"], { "releaseDate": date }); }}
                    onCancel={() => { }}
                    value={props.data["releaseDate"]}
                    // hideSaveButton={false}
                    saveButtonLabel="Y"
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<DateEditComponent />}
                />
            </h2>
            <h2 className="w-1/12 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={(score: any) => { updateAlbum(props.data["id"], { "score": score }); }}
                    onCancel={() => { }}
                    value={props.data["score"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-4/12 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={(review: any) => { updateAlbum(props.data["id"], { "review": review }); }}
                    onCancel={() => { }}
                    value={props.data["review"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-2/12 text-sm p-1 overflow-scroll">
                {props.data["artists"].map((artist: any) => {
                    return (
                        <div key={props.data["id"] + "" + artist["id"]}>
                            - {artist["name"]}
                            <br />
                        </div>
                    );
                })}
            </h2>
            <h2 className="w-2/12 text-sm p-1 overflow-scroll">
                {props.data["tags"].map((tag: any) => {
                    return (
                        <div key={props.data["id"] + "" + tag["id"]}>
                            - {tag["name"]}
                            <br />
                        </div>
                    );
                })}
            </h2>
        </div>
        // </Link>
    );
}