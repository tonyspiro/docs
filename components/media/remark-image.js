import { Image } from '~/components/media'
import RemarkCaption from '~/components/text/remark-caption'

const RemarkImage = ({ caption, ...props }) => (
  <>
    <Image {...props} />
    <RemarkCaption>{caption}</RemarkCaption>
  </>
)

export default RemarkImage
