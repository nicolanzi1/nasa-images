import Image from 'next/image'
import Link from 'next/link'

const ImagePreview = ({ thumbnailUrl, nasaId, title, desc }) => {
    return (
        <div className='preview'>
            <Link as={`/photo/${nasaId}`} href='/photo/[id]'>
                <a>
                    <Image 
                        width={250}
                        height={125}
                        src={thumbnailUrl}
                    />
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Desc: </strong>Hover below...</p>
                    <p className='desc'>{desc}</p>
                </a>
            </Link> 
        </div>
    )
}

export default ImagePreview
