'use server'

type VideoFromAPI = {
  id: { videoId: string }
  snippet: {
    title: string
    thumbnails: {
      high: { url: string }
    }
    description: string
  }
}

const transformVideos = (videos: Array<VideoFromAPI>) => {
  return videos.map(video => ({
    id: video.id.videoId ?? video.id,
    title: video.snippet.title,
    imageUrl: video.snippet.thumbnails.high.url,
    description: video.snippet.description
}))
}

async function getVideos(url: string) {
  try {
    const res = await fetch(url)
    const response = await res.json()

    if (response?.error) {
      throw new Error(response.error.message)
    }
    return transformVideos(response.items)
  } catch (e) {
    console.error('Error getting videos: ', e)
    return []
  }
}

export async function searchVideosByQuery(query: string) {
  const url = `${process.env.YOUTUBE_API_URL}search?part=snippet&maxResults=10&q=${query}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  return getVideos(url)
}

export async function getMostPopularVideos(regionCode = 'US') {
  const url = `${process.env.YOUTUBE_API_URL}videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=10&chart=mostPopular&regionCode=${regionCode}&key=${process.env.YOUTUBE_API_KEY}`
  return getVideos(url)
}
