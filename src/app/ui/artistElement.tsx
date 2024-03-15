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


const updateArtist = async (id: Number, body: any) => {
    await fetch("https://music-ssingh.onrender.com/artist/" + id, {
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
        location.reload();
    });
};

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

export default function ArtistElement(props: any) {
    return (
        <div className="flex items-center py-3 text-lg border-t border-b px-4">
            <h2 className="w-1/4 text-sm p-1">

                <br />
                {props.data["id"]}
            </h2>
            <h2 className="w-1/4 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={(name: any) => { updateArtist(props.data["id"], { "name": name }); }}
                    onCancel={() => { }}
                    value={props.data["name"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-1/4 text-sm p-1">
                <EasyEdit
                    type={Types.TEXT}
                    onSave={async (image: any) => {
                        updateArtist(props.data["id"], { "image": "https://music.ssingh.net/img?key=" + await uploadImage(image) });
                    }}
                    onCancel={() => { }}
                    value={props.data["image"]}
                    hideSaveButton={false}
                    cancelButtonLabel="X"
                    displayComponent={<DisplayComponent />}
                    editComponent={<EditComponent />}
                />
            </h2>
            <h2 className="w-1/4 text-sm p-1">
                <Image src={props.data["image"] == null ? "" : props.data["image"]} width={50} height={50} alt="" />
            </h2>
        </div>
        // </Link>
    );
}