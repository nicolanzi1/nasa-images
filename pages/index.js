import Head from 'next/head'
import { useState } from 'react'
import ImagePreview from '../components/ImagePreview'
import Pagination from '../components/Pagination'

export default function Home({ items }) {
  const [search, setSearch] = useState('')
  const [photos, setPhotos] = useState(items)
  const [currentPage, setCurrentPage] = useState(1)
  const [photosPerPage] = useState(9)

  // Get current photos
  const indexOfLastPhoto = currentPage * photosPerPage
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
            {currentPhotos && currentPhotos.map((preview) => (
              <ImagePreview 
                key={preview.data[0].nasa_id}
                thumbnailUrl={preview.links[0].href}
                nasaId={preview.data[0].nasa_id}
                title={preview.data[0].title}
                desc={preview.data[0].description}
              />
              ))}
          </div>
        </div>
        <Pagination photosPerPage={photosPerPage} totalPhotos={photos.length} paginate={paginate} />
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
