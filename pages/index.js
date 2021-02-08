import Head from 'next/head'
import { useState } from 'react'
import ImagePreview from '../components/ImagePreview'

export default function Home({ items }) {
  const [search, setSearch] = useState('')
 const [photos, setPhotos] = useState(items)

  return (
    <div className="container">
      <Head>
        <title>NASA Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className='title'>Welcome to NASA Images</h1>
        <div className='fade'>
          <div className='gridContainer'>
            {photos && photos.map((preview) => (
              <ImagePreview 
              key={preview.data[0].nasa_id}
              thumbnailUrl={preview.links[0].href}
              nasaId={preview.data[0].nasa_id}
              />
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://images-api.nasa.gov/search?media_type=image")
  const preview = await res.json()
  const items = await preview.collection.items
  return {
    props: { items }
  }
}
