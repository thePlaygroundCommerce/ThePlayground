import React from 'react'
import svg from "public/svgs/search.svg"
import Image from '../Image'

type Props = {}

const Search = (props: Props) => {
  return (
    <form
          action="/search"
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f251"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f251"]'
          className="k-naked-search w-form"
        >
          <div className="k-naked-wrap">
            <input
              className="k-naked-search-input w-input"
              maxLength={256}
              name="query"
              placeholder="Search…"
              type="search"
              id="search"
              required={false}
            />
            <div className="k-naked-search-btn-wrap">
              {/* <input
                type="submit"
                className="k-search-btn-new w-button"
                defaultValue=""
              /> */}
              <div className="k-search-icon k-icon-dark w-embed">
                <Image src={svg} alt={""} />
              </div>
            </div>
          </div>
        </form>
  )
}

export default Search