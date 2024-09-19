const baseUrl = "https://food-pos-data.vercel.app";
// const baseUrl = "http://localhost:3000";

export async function getData(path) {
  if (path) {
    const data = await fetch(`${baseUrl}/${path}`)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }
}
