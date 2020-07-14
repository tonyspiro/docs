import RemarkCaption from '~/components/text/remark-caption'
import components from '~/lib/remark-components'

const RemarkImage = ({
  caption,
  href,
  target,
  components: customComponents,
  ...props
}) => {
  const Image = ({ src, width, height, title, alt }) => (
    <figure>
      <img src={src} width={width} height={height} title={title} alt={alt} />
    </figure>
  )

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

      <style jsx>{`
        div {
          margin: 40px auto;
        }

        div :global(figure) {
          text-align: center;
        }

        div :global(figure img) {
          width: unset;
          max-width: 100%;
          height: auto;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default RemarkImage
