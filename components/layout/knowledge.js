import React from 'react'
import { useAmp } from 'next/amp'
import { withRouter } from 'next/router'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import Head from '~/components/layout/head'
import Heading from '~/components/text/linked-heading'
import ContentFooter from '~/components/layout/content-footer'
import components from '~/lib/remark-components'
import { H1, H2, H3, H4 } from '~/components/text'
import HR from '~/components/text/hr'
import { FooterFeedback } from '~/components/feedback-input'
import { PRODUCT_NAME, ORG_NAME } from '~/lib/constants'
import SubHeader from '~/components/subheader'
import Link from '~/components/text/link'
import Footer from '~/components/footer'
import Wrapper from '~/components/layout/wrapper'

import Note from '~/components/text/remark-note'

const DocH1 = ({ children }) => (
  <>
    <Heading noAnchor lean offsetTop={175}>
      <H1>{children}</H1>
    </Heading>
    <style jsx>{`
      :global(h1) {
        margin: 0;
      }
    `}</style>
  </>
)

const DocH2 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H2>{children}</H2>
    </Heading>
    <style jsx>{`
      :global(h2) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH3 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      :global(h3) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH4 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      :global(h4) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const NonAmpOnly = ({ children }) => (useAmp() ? null : children)

const ContentSection = ({ className, key, children }) => (
  <section className={className} key={key}>
    {children}
  </section>
)

const markdownProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      ...components,
      h2: DocH2,
      h3: DocH3,
      h4: DocH4
    }
  })

const MarkdownRender = ({ contentType, content }) =>
  contentType === 'default' ? (
    <>{markdownProcessor.processSync(content).result}</>
  ) : contentType === 'note' ? (
    <Note type="note">{markdownProcessor.processSync(content).result}</Note>
  ) : contentType === 'warning' ? (
    <Note type="warning">{markdownProcessor.processSync(content).result}</Note>
  ) : (
    <>unsupported markdown contentType {contentType}</>
  )

const KnowledgeBaseContentRender = ({ content }) => (
  <div>
    {content.map((block, index) => {
      console.log('block', block)

      return block._modelApiKey === 'markdown' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <MarkdownRender
            contentType={block.contentType}
            content={block.content}
          />
        </ContentSection>
      ) : block._modelApiKey === 'html' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'image' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'image_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'code' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'git_import' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'vercel_deploy_button' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'video' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : block._modelApiKey === 'video_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          {block._modelApiKey}
        </ContentSection>
      ) : (
        undefined
      )
    })}
  </div>
)

class withStandard extends React.PureComponent {
  render() {
    const {
      post = {
        title: `${PRODUCT_NAME} Documentation`,
        description: `The knowledge base and documentation for how to use ${PRODUCT_NAME} and how it works.`
      }
    } = this.props

    console.log('post', post)

    return (
      <>
        <Head
          titlePrefix=""
          titleSuffix={` - ${ORG_NAME} Documentation`}
          title={`${post.title}`}
          description={post.description}
          image={post.image}
          lastEdited={post.lastEdited}
        >
          {/* { 
            //TODO: set `noindex` for previews
            post.editUrl.includes('/docs/error/') && (
            <meta name="robots" content="noindex" />
          )} */}
        </Head>
        <header className="knowledge-heading">
          <Wrapper width="900">
            <SubHeader title="Knowledge">
              <Link href="/knowledge" style={{ fontSize: 14 }}>
                View All Articles
              </Link>
            </SubHeader>
            <div className="knowledge-title">
              <DocH1>{post.title}</DocH1>
            </div>
          </Wrapper>
        </header>
        <Wrapper width="768">
          <section className="knowledge">
            {post.content && (
              <KnowledgeBaseContentRender content={post.content} />
            )}

            <NonAmpOnly>
              <>
                <HR />
                <FooterFeedback />
              </>
            </NonAmpOnly>
            <ContentFooter
              lastEdited={post.lastEdited}
              // editUrl={meta.editUrl}
            />
          </section>
        </Wrapper>
        <Footer />
        <style jsx>{`
          .knowledge-heading {
            border-bottom: 1px solid #eaeaea;
            margin-top: 36px;
            padding-bottom: 44px;
            text-align: center;
          }

          .knowledge-title {
            padding-top: 15px;
          }

          .knowledge {
            padding-bottom: 64px;
            padding-top: 32px;
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(withStandard)
