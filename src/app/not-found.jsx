import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div className='mt-5 mb-5'>
                <center>
                    <h1 style={{ color: 'white' }}>Not found – 404!</h1>
                    <div>
                        <button className='btn btn-secondary mt-3'>
                            <Link href="/"
                                style={{ textDecoration: 'none', color: 'white' }}
                            >
                                Go back to Home
                            </Link>
                        </button>
                    </div>
                </center>
            </div>
        </>
    )
}