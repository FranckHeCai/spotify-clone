import { songs as allSongs } from "@/lib/data";
export async function GET({params, request}){
    const { url } = request
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get("id")
    const song = allSongs.filter((song)=> song.id === Number(id))

    return new Response(JSON.stringify({song}), {
        headers: {"content-type": "application/json"},
    })
}