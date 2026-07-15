import axios from "axios";

const LIBRARY_ID = "688372";
const STREAM_API_KEY = "431d5fef-9776-491d-a42042547dc9-80d8-4180";
const BASE_URL = "https://video.bunnycdn.com";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/library/${LIBRARY_ID}`,
  headers: {
    AccessKey: STREAM_API_KEY,
    accept: "application/json",
  },
});

async function fetchVideo(url, title, id) {
  try {
    const response = await apiClient.post(`/videos/fetch?collectionId=${id}`, {
      url,
      title,
    });
    console.log("Video fetched:", response.data);
    return apiClient.get("/videos/" + response.data.id);
  } catch (error) {
    console.error(
      "Error fetching video:",
      error.response?.data || error.message,
    );
  }
}

// 3. List Videos in Library
async function listVideos(title, collection) {
  const url = `/videos?collection=${collection}&search=${encodeURIComponent(title)}&page=1&itemsPerPage=100`;
  console.log(url);
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching videos:",
      error.response?.data || error.message,
    );
  }
}

export async function POST(req: Request) {
  if (!process.env.PRISMIC_WRITE_TOKEN)
    return Response.json("Importing is to only be used by admins!", {
      status: 500,
    });

  const data = await req.json();
  const { url, title, collection } = data;

  let collectionId: string;
  // check for duplicates

  // --> check for exising collection
  const { data: collections } = await apiClient.get(
    `/collections?&search=${encodeURIComponent(collection)}&page=1&itemsPerPage=100`,
  );

  if (collections.items && collections.items.length > 0) {
    const match = collections.items.find(
      (video) => video.name.toLowerCase() === collection.toLowerCase(),
    );
    if (match) {
      const msg = `Collection found! "${title}" exists. Reusing Collection ID: ${match.guid}`;
      console.log(msg);
      collectionId = match.guid; // Return the existing Bunny Video ID
    }
  } else {
    // create collection if none found
    console.log("Creating collection", collection);
    const {
      data: { guid },
    } = await apiClient.post(`/collections`, { name: collection });
    collectionId = guid;
  }

  const videos = await listVideos(title, collectionId);
  let video;

  if (videos.items && videos.items.length == 0) {
    video = await fetchVideo(url, title, collectionId);
  }

  const match = videos.items.find(
    (video) => video.title.toLowerCase() === title.toLowerCase(),
  );
  if (match) {
    const msg = `[DUPLICATE BLOCKED] "${title}" already exists. Reusing Video ID: ${match.guid}`;
    console.log(msg);
    video = match; // Return the existing Bunny Video ID
  }

  if (!video) return Response.json({ error: "No match!" });

  try {
    const embed_url = `https://player.mediadelivery.net/embed/${LIBRARY_ID}/${video.guid}`
    const { data: embed } = await axios.get(
      `/OEmbed?url=${embed_url}`,
      { baseURL: BASE_URL },
    );
    return Response.json({ ...embed, embed_url });
  } catch (error) {
    console.log(error, data);
    return Response.json("Error");
  }
}
