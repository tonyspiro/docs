import { Image } from '~/components/media'
import RemarkCaption from '~/components/text/remark-caption'
import components from '~/lib/remark-components'

const RemarkImage = ({
  caption,
  href,
  target,
  components: customComponents,
  ...props
}) => {
  return (
    <div>
      {href ? (
        <a href={href} target={target} rel="noopener">
          <Image {...props} />
        </a>
      ) : (
        <Image {...props} />
      )}
      <RemarkCaption
        components={{
          ...components,
          ...customComponents
        }}
      >
        {caption}
      </RemarkCaption>

      <style jsx>{``}</style>
    </div>
  )
}

export default RemarkImage
