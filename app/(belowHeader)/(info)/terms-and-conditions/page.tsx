import Heading from 'components/typography/Heading'
import React from 'react'

type Props = unknown

const Page = (props: Props) => {
    return (
        <div className='p-4'>
            <div>
                <Heading>Terms of Service</Heading>
                <div>
                    <div className="pt-4">
                        <p><strong>Terms</strong></p>
                        <p>By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.</p>
                    </div>
                    <div className="pt-4">
                        <p><strong>Use License</strong>
                        </p><ul><li>Permission is granted to temporarily download one copy of the materials (information or software) on The Playground Media LLC's web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</li></ul><ol><li>modify or copy the materials;</li><li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li><li>attempt to decompile or reverse engineer any software contained on The Playground Media LLC's web site;</li><li>remove any copyright or other proprietary notations from the materials; or</li><li>transfer the materials to another person or "mirror" the materials on any other server.</li></ol><ul><li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by The Playground Media LLC at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li></ul>
                    </div>
                    <div className="pt-4">
                        <p><strong>Disclaimer</strong></p>
                        <p>The materials on The Playground Media LLC's web site are provided "as is". The Playground Media LLC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, The Playground Media LLC does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.</p>
                    </div>

                    <div className="pt-4">
                        <p><strong>Limitations</strong></p>
                        <p>In no event shall The Playground Media LLC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on The Playground Media LLC's Internet site, even if The Playground Media LLC or a The Playground Media LLC authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
                    </div>

                    <div className="pt-4">
                        <p><strong>Revisions and Errata</strong></p>
                        <p>The materials appearing on The Playground Media LLC's web site could include technical, typographical, or photographic errors. The Playground Media LLC does not warrant that any of the materials on its web site are accurate, complete, or current. The Playground Media LLC may make changes to the materials contained on its web site at any time without notice. The Playground Media LLC does not, however, make any commitment to update the materials.</p>
                    </div>

                    <div className="pt-4">
                        <p><strong>Links</strong></p>
                        <p>The Playground Media LLC has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Playground Media LLC of the site. Use of any such linked web site is at the user's own risk.</p>
                    </div>

                    <div className="pt-4">
                        <p><strong>Site Terms of Use Modifications</strong></p>
                        <p>The Playground Media LLC may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>
                    </div>

                    <div className="pt-4">
                        <p><strong>Governing Law</strong></p>
                        <p>Any claim relating to The Playground Media LLC's web site shall be governed by the laws of the State of California without regard to its conflict of law provisions.</p>
                        <p>General Terms and Conditions applicable to Use of a Web Site.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page