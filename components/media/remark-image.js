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
      <main>
        <div>
          <img
            src={src}
            width={width}
            height={height}
            title={title}
            alt={alt}
          />
        </div>
      </main>
    </figure>
  )

  return (
    <div className="remark-image">
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
        div.remark-image {
          margin: 40px auto;
        }

        div.remark-image :global(figure) {
          text-align: center;
        }

        div.remark-image :global(figure main div img) {
          width: unset;
          max-width: 100%;
          height: auto;
          position: relative;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default RemarkImage
