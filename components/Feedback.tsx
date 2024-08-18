import React from 'react'
import { Button } from 'rsuite'

type Props = {}

const Feedback = (props: Props) => {
    return (
        <div className="w-full">
            <div className='md:w-3/4 m-auto mb-6'>
                <p className='m-auto text-center'>Thanks again for shopping with us.</p>
                <p className='m-auto text-center'>Let us know about your shopping experience, we strive to make our site easier to use. </p>
            </div>
            <div className="text-left flex mb-4">
                <div className="border px-3 py-1 w-full">
                    <textarea
                        id="experience"
                        name="experience"
                        className="w-full bg-white"
                        placeholder="How was your shopping experience?"
                    ></textarea>
                </div>
                <Button>Send</Button>
            </div>
        </div>
    )
}

export default Feedback