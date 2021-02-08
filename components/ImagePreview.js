import Image from 'next/image'
import Link from 'next/link'

const ImagePreview = ({ thumbnailUrl, nasaId }) => {
    return (
        <div>
            <Link as={`/photo/${nasaId}`} href='/photo/[id]'>
                <a>
                    <Image width={250} height={125} src={thumbnailUrl} />
                    <div>Nasa ID: {nasaId}</div>
                </a>
            </Link> 
        </div>
    )
}

export default ImagePreview
