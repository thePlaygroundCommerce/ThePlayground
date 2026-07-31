import { Field, Label, Description, Input, Button } from '@headlessui/react'
import Heading from './typography/Heading'

const Newsletter = ({
    title = "Find your next outdoor adventure",
    description = "Share your travel style and dates, and we’ll connect you with trusted local operators for rafting, hiking, Jeep tours, and more.",
    cta = "Get matched"
}) => {
    return (
        <div className='flex gap-24'>
            <div className='flex-1'>
                <h2 className='text-7xl font-black'>Not Ready <br/> To Make A <br/> Decision Yet?</h2>
            </div>
            <div className="flex-1 flex-col flex gap-4 text-center justify-center">
                <Heading level={2}>{title}</Heading>
                <Field>
                    {/* <Label>label</Label> */}
                    <p>{description}</p>
                    <div className='flex border m-2 p-2 mx-auto border-slate-700 rounded-lg overflow-hidden'>
                        <Input placeholder="Email address" className="flex-1 p-2" name={`newletter-email-input`} type="email" />
                        <Button className="px-2 bg-sky-300 rounded-md">{cta}</Button>
                    </div>
                </Field>
            </div>
        </div>
    )
}

export default Newsletter