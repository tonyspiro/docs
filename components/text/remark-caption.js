import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import components from '~/lib/remark-components'
const markdownProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components
  })

const RemarkCaption = ({ children, ...props }) => (
  <p {...props} className="caption">
    {markdownProcessor.processSync(children).result}
    <style jsx>
      {`
        p {
          color: var(--accents-5);
          line-height: var(--line-height-small);
          margin: -24px 0 40px 0;
          text-align: center;
        }

        p :global(div p) {
          font-size: var(--font-size-small);
        }
      `}
    </style>
  </p>
)

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: var(--font-mono);
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }
      `}
    </style>
  </code>
)

RemarkCaption.Code = Code

export default RemarkCaption
