import { Image } from '~/components/media'
import RemarkCaption from '~/components/text/remark-caption'
import components from '~/lib/remark-components'

const RemarkImage = ({ caption, href, target, ...props }) => {
  const img = href ? (
    <a href={href} target={target} rel="noopener">
      <Image {...props} />
    </a>
  ) : (
    <Image {...props} />
  )
  return (
    <div>
      {img}
      <RemarkCaption
        components={{
          ...components,
          ...props.components
        }}
      >
        {caption}
      </RemarkCaption>

      <style jsx>{`
        div :global(img) {
          height: auto;
        }
      `}</style>
    </div>
  )
}

export default RemarkImage
