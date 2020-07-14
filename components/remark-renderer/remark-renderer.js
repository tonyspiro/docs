import React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import RemarkNote from '~/components/text/remark-note'
import RemarkCaption from '~/components/text/remark-caption'

const RemarkRenderer = ({ contentType, children, components }) => {
  const markdownProcessor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehype2react, {
      createElement: React.createElement,
      components
    })

  return contentType === 'default' ? (
    <>{markdownProcessor.processSync(children).result}</>
  ) : contentType === 'note' ? (
    <RemarkNote type="note">
      {markdownProcessor.processSync(children).result}
    </RemarkNote>
  ) : contentType === 'warning' ? (
    <RemarkNote type="warning">
      {markdownProcessor.processSync(children).result}
    </RemarkNote>
  ) : contentType === 'caption' ? (
    <RemarkCaption components={{ ...components }}>{children}</RemarkCaption>
  ) : contentType === undefined ? (
    <>{markdownProcessor.processSync(children).result}</>
  ) : (
    <>unsupported markdown contentType {contentType}</>
  )
}

export default RemarkRenderer
