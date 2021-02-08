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
        <h1 className='title'>Welcome to <strong>NASA</strong> Images</h1>
        <input 
          id="nasaSearch"
          onChange={(e) => setSearch(e.target.value)}
          className='searchInput'
          type='text'
          placeholder='Search Space with Nasa...'
        />
        <button className='btn' disabled={search === ''} onClick={
          async () => {
            const res = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${search}`)
            const preview = await res.json()
            setPhotos(await preview.collection.items)
          }
        }>Search</button>
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
