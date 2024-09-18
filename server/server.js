const baseUrl = "https://food-pos-data.vercel.app"


export async function getData(path) {
    if(path){
        try {
            const res = await fetch(`${baseUrl}/${path}`)
            const data = await res.json()
        return data
        } catch (error) {
            console.log(error);
        }
    }
}