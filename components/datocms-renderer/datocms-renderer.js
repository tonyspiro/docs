import { RemarkImage } from '~/components/media'
import RemarkRenderer from '~/components/remark-renderer'
import components from '~/lib/remark-components'

const ContentSection = ({ className, children }) => (
  <section className={className}>{children}</section>
)

const DatoCMSRenderer = ({ content, ...props }) => (
  <article>
    {content.map((block, index) => {
      console.log('block', block)

      return block._modelApiKey === 'markdown' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkRenderer
            components={{
              ...components,
              ...props.components
            }}
            contentType={block.contentType}
          >
            {block.content}
          </RemarkRenderer>
        </ContentSection>
      ) : block._modelApiKey === 'html' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'image' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkImage
            href={block.imageAnchor}
            target={block.openAnchorInNewWindow === true ? '_blank' : undefined}
            src={block.image.url}
            width={block.image.width}
            height={block.image.height}
            title={block.image.title}
            alt={block.image.alt}
            caption={block.caption}
          />
        </ContentSection>
      ) : block._modelApiKey === 'image_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkImage
            href={block.imageAnchor}
            target={block.openAnchorInNewWindow === true ? '_blank' : undefined}
            src={block.imageUrl}
            caption={block.caption}
          />
        </ContentSection>
      ) : block._modelApiKey === 'code' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'git_import' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'vercel_deploy_button' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'video' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'video_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : (
        undefined
      )
    })}
    <style jsx>{`
      article :global(p > img) {
        display: block;
        margin: 40px auto;
        text-align: center;
      }
    `}</style>
  </article>
)

export default DatoCMSRenderer
