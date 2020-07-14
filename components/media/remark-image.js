import { Image } from '~/components/media'
import RemarkCaption from '~/components/text/remark-caption'
import components from '~/lib/remark-components'

const RemarkImage = ({ caption, ...props }) => (
  <>
    <Image {...props} />
    <RemarkCaption
      components={{
        ...components,
        ...props.components
      }}
    >
      {caption}
    </RemarkCaption>
  </>
)

export default RemarkImage
